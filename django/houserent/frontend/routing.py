'''
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from frontend.consumers import NotificationConsumer
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from consumers import NotificationConsumer

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    path("ws/notifications/", NotificationConsumer.as_asgi()),
                ]
            )
        ),
    }
)
'''