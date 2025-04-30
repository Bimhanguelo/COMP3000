from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from main import routing

application = ProtocolTypeRouter({
    "websocket": URLRouter(
        routing.websocket_urlpatterns
    ),
    "http": get_asgi_application()
})
