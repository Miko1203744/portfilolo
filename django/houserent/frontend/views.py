from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from .models import View_schedule, Notification
from rest_framework.response import Response
# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


'''
@database_sync_to_async
def create_notification(agent, message, viewing_schedule):
    # Create the notification
    from .models import Notification
    notification = Notification.objects.create(
        agent=agent,
        message=message,
        is_read=False,
        viewing_schedule=viewing_schedule
    )

    # Save the notification to the database
    notification.save()
    channel_layer = get_channel_layer()
    # Send the notification to the WebSocket group
    async_to_sync(channel_layer.group_send)(
        "notification_group",
        {
            'type': 'send_notification',
            'notification': {
                'id': notification.id,
                'message': notification.message,
                'view_schedule_id': notification.viewing_schedule.id,
                # Include any other fields you need to send to the frontend
            }
        }
    )
'''


def owneraccept_house_viewing(request, pk):

    try:
        house_viewing = get_object_or_404(View_schedule, pk=pk)
    # Update the house viewing instance to mark it as accepted
        house_viewing.houseowner_accepted = 'True'
        house_viewing.save()

        if house_viewing.agent_accepted:
            Notification.objects.filter(house_id=pk).delete()
            notify_tenant(house_viewing)

        notification_id = View_schedule.notification.id

        # Delete the notification from the database using the notification ID
        Notification.objects.filter(id=notification_id).delete()

        return JsonResponse({'message': 'Successfully accepted the viewing request.'})
    except View_schedule.DoesNotExist:
        return JsonResponse({'error': 'View schedule not found.'}, status=404)


def ownerreject_house_viewing(request, pk):
    try:
        house_viewing = get_object_or_404(View_schedule, pk=pk)
        # Update the house viewing instance to mark it as rejected
        house_viewing.houseowner_rejected = 'True'
        house_viewing.save()

        if house_viewing.agent_rejected:
            notify_tenant_rejection(house_viewing)
        notification_id = View_schedule.notification.id
        Notification.objects.filter(id=notification_id).delete()

    # Perform any additional actions or redirect to a success page
        return JsonResponse({'message': 'Successfully reject the viewing request.'})
    except View_schedule.DoesNotExist:
        return JsonResponse({'error': 'View schedule not found.'}, status=404)


def agentaccept_house_viewing(request, pk):
    try:
        house_viewing = get_object_or_404(View_schedule, pk=pk)
        # Update the house viewing instance to mark it as accepted
        house_viewing.agent_accepted = 'True'
        house_viewing.save()

        if house_viewing.houseowner_accepted:
            notify_tenant(house_viewing)
        notification_id = View_schedule.notification.id

        # Delete the notification from the database using the notification ID
        Notification.objects.filter(id=notification_id).delete()
    # Perform any additional actions or redirect to a success page
        return JsonResponse({'message': 'Successfully accepted the viewing request.'})
    except View_schedule.DoesNotExist:
        return JsonResponse({'error': 'View schedule not found.'}, status=404)


def agentreject_house_viewing(request, pk):
    try:
        house_viewing = get_object_or_404(View_schedule, pk=pk)
        # Update the house viewing instance to mark it as rejected
        house_viewing.agent_rejected = 'True'
        house_viewing.save()

        if house_viewing.houseowner_rejected:
            notify_tenant_rejection(house_viewing)

        notification_id = View_schedule.notification.id

        # Delete the notification from the database using the notification ID
        Notification.objects.filter(id=notification_id).delete()
        return JsonResponse({'message': 'Successfully reject the viewing request.'})
    except View_schedule.DoesNotExist:
        return JsonResponse({'error': 'View schedule not found.'}, status=404)


def notify_tenant(house_viewing):
    # Notify the tenant that the viewing request is accepted
    message = f"Your viewing request for {house_viewing.house} at {house_viewing.review_time_date} has been accepted. You can now see the house at the scheduled time."

    tenant_notification = Notification.objects.create(
        user=house_viewing.user_tenante, message=message, house_id=house_viewing.id)
    tenant_notification.save()


def notify_tenant_rejection(house_viewing):
    # Notify the tenant that the viewing request has been rejected
    message = f"Your viewing request for {house_viewing.house} at {house_viewing.review_time_date} has been rejected."

    tenant_notification = Notification.objects.create(
        user=house_viewing.user_tenante, message=message, house_id=house_viewing.id)
    tenant_notification.save()
