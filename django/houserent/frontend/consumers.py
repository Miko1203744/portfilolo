'''
from channels.generic.websocket import AsyncWebsocketConsumer
import json


class NotificationConsumer(AsyncWebsocketConsumer):
    print(AsyncWebsocketConsumer)
    async def connect(self):
        
        await self.channel_layer.group_add(
            "notification_group",
            self.channel_name,

        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "notification_group",
            self.channel_name
        )

    async def receive(self, text_data):
        pass  # Handle incoming WebSocket messages

    async def send_notification(self, event):
        notification = event["notification"]

        # Send the notification message to the WebSocket
        await self.send(text_data=json.dumps({
            'type': 'send_notification',
            'notification': notification,
        }))
'''