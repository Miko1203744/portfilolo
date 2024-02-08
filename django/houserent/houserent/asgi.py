# Inside houserent/asgi.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from frontend.consumers import NotificationConsumer
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'houserent.settings')
application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    # ... other paths ...
                    path("ws/notifications/", NotificationConsumer.as_asgi()),
                ]
            )
        ),
    }
)
