from dataclasses import field
from rest_framework import serializers
from frontend.models import House, House_type, Photo, Agent, View_schedule, Notification
from core.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth import authenticate


class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ('id', 'house_location', 'house_image', 'house_bedroom', 'house_size_in_feet',
                  'house_details', 'is_house_with_utensil', 'is_house_with_kitchen', 'is_house_reserved', 'house_address', 'fees_in_birr', 'date')


class HouseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = House_type
        fields = ('type', 'Icon')


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('house', 'image')


class YourLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class AgentSerializer(serializers.ModelSerializer):
    agent_image = serializers.ImageField(use_url=True)

    class Meta:
        model = Agent
        fields = ('id', 'agent_image', 'agent_phone_number',
                  'user', 'agent_workdone')


class ViewScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = View_schedule
        fields = ('review_time_date', 'house', 'user_tenante', 'user_agent')


class NotficationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
