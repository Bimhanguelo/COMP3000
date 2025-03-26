"""
ASGI config for lms_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

# asgi.py
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from main.routing import websocket_urlpatterns  # Import your WebSocket routing configuration
from channels.layers import get_channel_layer

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": (
        URLRouter(
            websocket_urlpatterns
        ),
    ),
})

# Use the configured channel layer
channel_layer = get_channel_layer()
