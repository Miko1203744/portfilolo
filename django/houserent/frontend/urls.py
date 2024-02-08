from django.urls import path
from django.urls import re_path
from .views import index, get_csrf_token, owneraccept_house_viewing, ownerreject_house_viewing, agentaccept_house_viewing, agentreject_house_viewing
'''
from .consumers import NotificationConsumer

websocket_urlpatterns = [
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
]
'''
urlpatterns = [
    path('owner_accept/<int:pk>', owneraccept_house_viewing,
         name='owneraccept_house_viewing'),
    path('owner_reject/<int:pk>', ownerreject_house_viewing,
         name='ownerreject_house_viewing'),
    path('agent_accept/<int:pk>', agentaccept_house_viewing,
         name='agentaccept_house_viewing'),
    path('agent_reject/<int:pk>', agentreject_house_viewing,
         name='agentreject_house_viewing'),
    path('', index, name="home"),
    path('about', index, name="about"),
    path('service', index),
    path('property', index),
    path('property-list', index),
    path('property-agent', index),
    path('user', index),
    path('contact', index),
    path('sign-in', index),
    path('sign-up', index),
    path('profile', index),
    path('house/<str:type>', index),
    path('addhome', index),
    path('add_photo/<int:house_id>/', index),
    path('housedetail/<int:house_id>/', index),
    path('Notfication', index),
    path('Agent', index, name="agent"),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),

]
