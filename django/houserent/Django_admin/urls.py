from django.urls import path
from .views import indexs

urlpatterns = [
    path("admin_s", indexs),
]   # Other backend URLs
