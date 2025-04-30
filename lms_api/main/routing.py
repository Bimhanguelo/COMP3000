# main/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from main.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/$', ChatConsumer.as_asgi()),
    re_path(r'ws/notify/$', ChatConsumer.as_asgi()),  # Add the new URL pattern for notify
]

application = ProtocolTypeRouter({
    'websocket': URLRouter(websocket_urlpatterns),
})
