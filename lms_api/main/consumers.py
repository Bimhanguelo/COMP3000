from datetime import timezone
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import TeacherStudentChat

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Access query parameters from the scope
        query_params = self.scope['query_string'].decode('utf-8').split('&')
        # Initialize an empty dictionary to store the extracted values
        params = {}

        # Loop through each string in the list
        for param_string in query_params:
            # Split each string into key and value using '=' as the separator
            key, value = param_string.split('=')
            # Add the key-value pair to the dictionary
            params[key] = value

        # Access individual parameters
        student_id = params.get('student_id')
        teacher_id = params.get('teacher_id')

        print("Student ID:", student_id)
        print("Teacher ID:", teacher_id)

        # Accept the WebSocket connection
        await self.accept()

        # Retrieve initial messages based on student_id and teacher_id
        initial_messages = await self.get_initial_messages(student_id, teacher_id)

        # Send the initial messages to the frontend
        await self.send(text_data=json.dumps({
            'messages': initial_messages,
        }))

    @sync_to_async
    def get_initial_messages(self, student_id, teacher_id):
        # Retrieve initial messages from the database
        messages = TeacherStudentChat.objects.filter(student_id=student_id, teacher_id=teacher_id)
        # Convert messages to a list of dictionaries
        messages_list = [
            {
                'message': message.msg_to,
                'msg_from': message.msg_from,
                'msg_time': message.msg_time.strftime('%Y-%m-%d %H:%M:%S'),
            }
            for message in messages
        ]
        return messages_list

    async def receive(self, text_data):
        # Handle incoming messages from the frontend
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        msg_from = text_data_json['msg_from']
        student_id = text_data_json['student_id']
        teacher_id = text_data_json['teacher_id']

        # Save the incoming message to the database
        await self.save_message(student_id, teacher_id, msg_from, message)

        # Send the message to the other party
        await self.send(text_data=json.dumps({
            'message': message,
            'msg_from': msg_from,
            'msg_time': self.get_current_time(),
        }))

    @sync_to_async
    def save_message(self, student_id, teacher_id, msg_from, message):
        # Save the message to the database
        TeacherStudentChat.objects.create(
            student_id=student_id,
            teacher_id=teacher_id,
            msg_from=msg_from,
            msg_to=message,
        )

    def get_current_time(self):
        # Helper method to get the current time in the desired format
        return timezone.now().strftime('%Y-%m-%d %H:%M:%S')