from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.exceptions import MethodNotAllowed
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login, authenticate
from .serializers import YourLoginSerializer, HouseSerializer, HouseTypeSerializer, PhotoSerializer, ViewScheduleSerializer, AgentSerializer, NotficationSerializer
from django.shortcuts import get_object_or_404, redirect
from rest_framework import generics
from random import randint
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from frontend.models import Profile_image, House, House_type, Photo, View_schedule, Agent, Notification
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import logout  # Import the logout function
from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token
# Create your views here.
User = get_user_model()

# query all house view


class HouseViewSet(generics.ListAPIView):
    queryset = House.objects.all()
    serializer_class = HouseSerializer

# all House Agent query


class AgentViewSet(generics.ListAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer


class AgentInfoViewSet(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            try:
                AgentInfo = Agent.objects.get(user=request.user)
                data = {
                    'phonenumber': AgentInfo.agent_phone_number,
                    'workdone': AgentInfo.agent_workdone
                }
                return Response(data)
            except Profile_image.DoesNotExist:
                return Response({'error': 'agent not found'}, status=404)
        else:
            return Response("not authenticate", status=401)


class UpdateAgentView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        profile = Profile_image.objects.get(user=request.user)
        profile_image = profile.image
        phonumber = request.data.get('phonenumber', '')
        print(phonumber)
        workdone = request.data.get('workdone', '')
        print(workdone)

        # Update the Profile_image model
        agent, created = Agent.objects.get_or_create(user=user)
        agent.agent_phone_number = phonumber
        agent.agent_workdone = workdone
        agent.agent_image = profile_image
        agent.save()

        return Response({'message': 'agent updated successfully'}, status=status.HTTP_200_OK)
# random agent generate


class RandomAgentAPIView(APIView):
    def get(self, request):
        count = Agent.objects.count()
        if count == 0:
            return Response({"detail": "No agents available."}, status=status.HTTP_404_NOT_FOUND)

        random_index = randint(0, count - 1)
        random_agent = Agent.objects.all()[random_index]
        serializer = AgentSerializer(random_agent)
        data = {
            'agent_info': serializer.data,
            'user': random_agent.user.username
        }
        return Response(data)

# all house schedule search


class NotficationView(generics.ListAPIView):
    def get(self, request):
        Notifications = Notification.objects.filter(
            user=request.user)
        if len(Notifications) == 0:
            return Response(status=status.HTTP_200_OK)
        else:
            serializer = NotficationSerializer(Notifications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class ViewScheduleViewSet(generics.ListAPIView):
    queryset = View_schedule.objects.all()
    serializer_class = ViewScheduleSerializer

# create view schedule


class CreateViewScheduleViewSet(APIView):
    def post(self, request, *args, **kwargs):
        date = request.data.get('Date')
        print(date)
        house_id = request.data.get('house_id')
        agent_id = request.data.get('agent_id')

        try:
            house = House.objects.get(id=house_id)
        except House.DoesNotExist:
            return Response({'error': 'House not found'}, status=404)

        try:
            agent = Agent.objects.get(id=agent_id)
        except Agent.DoesNotExist:
            return Response({'error': 'Agent not found'}, status=404)

        View_schedule.objects.create(
            review_time_date=date, house=house, user_tenante=request.user, user_agent=agent.user)

        return Response('Schedule successfully created', status=200)


# allhouse type query view

class HouseTypeViewSet(generics.ListAPIView):
    queryset = House_type.objects.all()
    serializer_class = HouseTypeSerializer

# register view


class registerForm(APIView):
    def post(self, request, format=None):

        # Access form data
        name = request.data.get('name')
        print(name)
        email = request.data.get('email')
        print(email)
        password = request.data.get('password')
        print(password)
        confirmPassword = request.data.get('confirmPassword')
        print(confirmPassword)
        gender = request.data.get('gender')
        print(gender)
        is_agent = request.data.get('is_agent')
        print(is_agent)
        is_landlord = request.data.get('is_landlord')
        print(is_landlord)
        is_tenant = request.data.get('is_tenant')
        print(is_tenant)

        if password != confirmPassword:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user if passwords match
        try:
            user = User.objects.create_user(
                username=name, email=email, password=password)
            user.gender = gender
            user.is_agent = is_agent
            user.is_landlord = is_landlord
            user.is_tenant = is_tenant
            user.save()
            return Response({'message': 'Form submitted successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Return a response
        return Response({'message': 'Form submitted successfully'})

# login view


class LoginView(APIView):
    '''
    def post(self, request, format=None):
        username = request.POST.get('username')
        print(username)
        password = request.POST.get('password')
        print(password)
        csrf_token = get_token(request)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success': 'Logged in', 'csrf_token': csrf_token}, status=200)
        else:
            print("true")
            return Response({'error': 'Invalid credentials'}, status=400)
    '''

    def post(self, request, *args, **kwargs):
        serializer = YourLoginSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("write")
            username = serializer.data.get('username', '')
            print(username)
            password = serializer.data.get('password', '')
            print(password)
            csrf_token = get_token(request)
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                if user.is_superuser:
                    return Response({'redirect': '/admin_s', 'csrf_token': csrf_token})
                elif user.is_Tenante:
                    return Response({'redirect': '/', 'csrf_token': csrf_token})
                elif user.is_landlord:
                    return Response({'redirect': '/', 'csrf_token': csrf_token})
                elif user.is_agent:
                    return Response({'redirect': '/Agent', 'csrf_token': csrf_token})
                else:
                    return Response({'error': 'User type not recognized'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Incorrect username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Return validation errors as a DRF Response
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# logout view


class LogoutView(APIView):
    def post(self, request):
        request.session.flush()
        return Response({'success': 'Logged out'}, status=200)

# profile view create


class ProfileView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            try:
                profile_image = Profile_image.objects.get(user=request.user)
                data = {
                    'user_id': profile_image.user.id,
                    'user': profile_image.user.username,
                    'image': profile_image.image.url,
                    'gender': profile_image.user.gender,
                    'is_landlord': profile_image.user.is_landlord,
                    'is_tenant': profile_image.user.is_Tenante,
                    'is_agent': profile_image.user.is_agent,
                }
                return Response(data)
            except Profile_image.DoesNotExist:
                return Response({'error': 'Profile not found'}, status=404)
        else:
            return Response("not authenticate", status=401)

# update user profile view


class UpdateProfileView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        print(user)
        username = request.data.get('username', '')
        print(username)
        gender = request.data.get('gender', '')
        print(gender)
        image = request.FILES.get('image')
        print(image)
        # Update the User model

        user.gender = gender
        user.username = username
        user.save()

        # Update the Profile_image model
        profile_image, created = Profile_image.objects.get_or_create(user=user)
        if image:
            profile_image.image = image
            profile_image.save()

        return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)

# house type class view


class HouseTypeAPIView(APIView):
    def get(self, request, type):
        housetype = House_type.objects.get(type=type)
        x = housetype.id
        print(x)
        houses = House.objects.filter(type=x)
        # Indicates that 'houses' is a queryset
        serializer = HouseSerializer(houses, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

# create house by landlord view


@api_view(['POST'])
def create_house(request):
    if request.method == 'POST':
        house_location = request.POST.get('house_location')
        house_image = request.FILES.get('house_image')
        house_bedroom = request.POST.get('house_bedroom')
        house_size_in_feet = request.POST.get('house_size_in_feet')
        house_details = request.POST.get('house_details')
        is_house_with_utensil = request.POST.get(
            'is_house_with_utensil') == 'true'
        is_house_with_kitchen = request.POST.get(
            'is_house_with_kitchen') == 'true'
        user = request.user  # Get the currently logged-in user
        is_house_reserved = request.POST.get('is_house_reserved') == 'true'
        house_address = request.POST.get('house_address')
        fees_in_birr = request.POST.get('fees_in_birr')
        # Replace with the actual HouseType ID
        type_id = request.POST.get('type', 1)

        x = House.objects.create(
            house_location=house_location,
            house_image=house_image,
            house_bedroom=house_bedroom,
            house_size_in_feet=house_size_in_feet,
            house_details=house_details,
            is_house_with_utensil=is_house_with_utensil,
            is_house_with_kitchen=is_house_with_kitchen,
            user=user,
            is_house_reserved=is_house_reserved,
            house_address=house_address,
            fees_in_birr=fees_in_birr,
            type_id=type_id
        )

        return Response({'house_id': x.id}, status=status.HTTP_201_CREATED)
    else:
        raise MethodNotAllowed(request.method)

# upload house photo by landlord view


@api_view(['POST'])
def upload_photos(request):
    if request.method == 'POST':
        house_id = request.POST.get('house_id')
        house = House.objects.get(id=house_id)
        photos = request.FILES.getlist('photos')
        print(photos)
        for photo in photos:
            Photo.objects.create(house=house, image=photo)
        photos = Photo.objects.filter(house=house)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data, status=200)

    return Response({'error': 'Invalid request method'}, status=400)

# filter house photo


class PhotoListByHouseIdAPIView(APIView):
    def get(self, request, house_id, *args, **kwargs):
        try:
            house = House.objects.get(id=house_id)
            photos = Photo.objects.filter(house=house)
            serializer = PhotoSerializer(photos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Photo.DoesNotExist:
            return Response({'detail': 'Photos not found for the given house ID.'}, status=status.HTTP_404_NOT_FOUND)


# house filter by their request.user view

class HouseListByUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        houses = House.objects.filter(user=user)
        serializer = HouseSerializer(houses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# house detail view
class HouseDetailView(APIView):
    def get(self, request, house_id):
        house = get_object_or_404(House, pk=house_id)
        serializer = HouseSerializer(house)
        photos = Photo.objects.filter(house=house)
        serializers = PhotoSerializer(photos, many=True)
        response_data = {
            'house': serializer.data,
            'photos': serializers.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class userrelatehouse(APIView):
    def get(self, request, house_location):
        houses = House.objects.filter(
            user=request.user, house_location=house_location)
        print(houses)

        serializer = HouseSerializer(houses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HouseSearchAPIView(generics.ListAPIView):
    serializer_class = HouseSerializer  # Make sure to import HouseSerializer

    def get_queryset(self):
        location = self.request.query_params.get('location', '')
        bedroom = self.request.query_params.get('bedroom', '')
        max_fee = self.request.query_params.get('max_fee', '')

        queryset = House.objects.all()  # Make sure to import House

        # Apply filters based on provided parameters
        if location:
            queryset = queryset.filter(house_location=location)

        if bedroom:
            queryset = queryset.filter(house_bedroom=bedroom)

        if max_fee:
            queryset = queryset.filter(fees_in_birr__lte=max_fee)

        print(queryset)  # This line prints the queryset for debugging purposes
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


def schedule_view(request, house_id, agent_id, tenant_id):
    # ... your existing code ...
    date = request.data.get('Date')
    print(date)
    house_id = request.data.get('house_id')
    agent_id = request.data.get('agent_id')
    # Send a notification to the agent via WebSocket
    house = House.objects.get(id=house_id)
    agent = Agent.objects.get(id=agent_id)

    channel_layer = get_channel_layer()
    agent_channel_name = f"user_{agent.id}"

    async_to_sync(channel_layer.group_add)(
        agent_channel_name,
        agent_channel_name  # Use the agent_channel_name directly
    )

    async_to_sync(channel_layer.group_send)(
        agent_channel_name,
        {
            "type": "notify.agent",
            "message": f"New viewing scheduled for {house} with {request.user.username} on {date}.",
        }
    )

    return JsonResponse({'message': 'Schedule created successfully'})
