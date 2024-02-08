from django.contrib import admin
from .models import Profile_image, House, House_type, Photo, Agent, View_schedule, Notification
from core.models import User
# Register your models here.

admin.site.register(House)
admin.site.register(House_type)
admin.site.register(Photo)
admin.site.register(User)
admin.site.register(Profile_image)
admin.site.register(View_schedule)
admin.site.register(Agent)
admin.site.register(Notification)
