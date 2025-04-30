import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Message = ({ teacher_id, student_id }) => {
  const [msgData, setMsgData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([])

  const connectWebSocket = () => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/?student_id=${student_id}&teacher_id=${teacher_id}`);

    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened:', ws);
    });

    ws.addEventListener('message', (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData) {
        setMessages(messageData.messages)
      }
      console.log(messageData)
    });

    ws.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
      // Implement reconnect logic here
      setTimeout(() => {
        connectWebSocket();
      }, 2000); // Reconnect after 2 seconds (adjust as needed)
    });

    setWebSocket(ws);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    // Send the new message via WebSocket
    if (webSocket) {
      webSocket.send(JSON.stringify({
        message: newMessage,
        msg_from: 'student',  // Assuming the message is sent from the student
        student_id,
        teacher_id,
      }));
    }

    // Clear the input field
    setNewMessage('');
  }

  useEffect(() => {
    connectWebSocket();

    // Clean up WebSocket connection on component unmount
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [teacher_id, student_id]);

  // const fetchMessages = () => {
  //   axios.get(`http://localhost:8000/api/get-message/${teacher_id}/${student_id}`)
  //     .then((res) => {
  //       setMsgData(res.data);
  //       scrollToBottom();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleSendMessage = () => {
  //   if (newMessage.trim() === '') {
  //     return;
  //   }

  //   // Send the new message via WebSocket
  //   ws.current.send(JSON.stringify({ message: newMessage }));

  //   // Clear the input field
  //   setNewMessage('');
  // };

  const scrollToBottom = () => {
    const msgList = document.getElementById('msgList');
    msgList.scrollTop = msgList.scrollHeight;
  };

  const msgListStyle = {
    height: '500px',
    overflow: 'auto',
  };

  return (
    <>
      {/* Refresh Button */}
      <p>
        <span
          className="btn btn-sm btn-secondary"
          // onClick={fetchMessages}
          title="Refresh"
        >
          <i className="bi bi-bootstrap-reboot"></i>
        </span>
      </p>

      {/* Message List */}
      <div style={msgListStyle} id="msgList">
        {messages && messages.map((row, index) => (
          <div
            key={index}
            className={`row mb-4 ${row.msg_from === 'teacher' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`col-5 ${row.msg_from !== 'teacher' ? 'ms-3' : 'offset-7 me-3'}`}>
              <div
                className={`alert ${row.msg_from !== 'teacher' ? 'alert-dark' : 'alert-info'} mb-1 rounded-lg`}
              >
                {row.message}
              </div>
              <small
                className={`text-muted ${row.msg_from !== 'teacher' ? 'ms-3' : 'me-3'}`}
              >
                
                {row.msg_time}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSendMessage} 
        >
          Send
        </button>
      </div>
    </>

  );
};

export default Message
