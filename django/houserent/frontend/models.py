from django.db import models
from core.models import User
# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings


class Profile_image(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='houses/',
                              blank=True, default='static/images/default.jpg')

    def __str__(self):
        return f'{self.user.username} Profile_image'


@receiver(post_save, sender=User)
def create_profile_image(sender, instance, created, **kwargs):
    if created:
        Profile_image.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile_image(sender, instance, **kwargs):
    instance.profile_image.save()


class House_type(models.Model):
    type = models.CharField(max_length=200)
    Icon = models.ImageField(upload_to='static/img', default='default.jpg')

    def __str__(self):
        return self.type


class House(models.Model):
    CHOICES = (
        ('mexico', 'mexico'),
        ('shiromeda', 'shiromeda'),
        ('arat kilo', 'arat kilo'),
        ('amist kilo', 'amist kilo'),
        ('piassa', 'piassa'),

    )
    house_location = models.CharField(max_length=40, choices=CHOICES)
    house_image = models.ImageField(upload_to='static/img')
    house_bedroom = models.IntegerField()
    house_size_in_feet = models.CharField(max_length=200)
    house_details = models.TextField()
    is_house_with_utensil = models.BooleanField()
    is_house_with_kitchen = models.BooleanField(default="True")
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='1')
    is_house_reserved = models.BooleanField(default="False")
    house_address = models.CharField(
        max_length=100, default="ferencay legasion mazoriya")
    fees_in_birr = models.IntegerField()
    date = models.DateField(auto_now=True)
    type = models.ForeignKey(
        'House_type', on_delete=models.CASCADE, default='1')

    def __str__(self):
        return f'{self.user.username} house'


class Photo(models.Model):
    house = models.ForeignKey('House', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='static/img')


class View_schedule(models.Model):
    review_time_date = models.CharField(max_length=200)
    house = models.ForeignKey('House', on_delete=models.CASCADE)
    user_tenante = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tenant_schedule", default="1")
    user_agent = models.ForeignKey(
        User, on_delete=models.CASCADE, default="1", related_name="agent_schedule")
    agent_accepted = models.BooleanField(default=False)
    agent_rejected = models.BooleanField(default=False)
    houseowner_accepted = models.BooleanField(default=False)
    houseowner_rejected = models.BooleanField(default=False)


@receiver(post_save, sender=View_schedule)
def view_schedule_created(sender, instance, created, **kwargs):
    if created:
        # A new View_schedule instance was created
        # Call the create_notification function here passing the necessary parameter

        message = f"The tenant has scheduled a house viewing at {instance.review_time_date}."

        notification = Notification.objects.create(
            user=instance.house.user, message=message, house_id=instance.id)
        notification.save()

        notification = Notification.objects.create(
            user=instance.user_agent, message=message, house_id=instance.id)
        notification.save()


class Agent(models.Model):
    agent_image = models.ImageField(
        upload_to='houses/', default='static/images/default.jpg')
    agent_phone_number = models.CharField(max_length=50, default="000")
    user = models.OneToOneField(User, on_delete=models.CASCADE, default='1')
    agent_workdone = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.user.username}'


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    house_id = models.IntegerField(default=0)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Add any other fields or methods you need

    def __str__(self):
        return f"Notification ID: {self.id}, Message: {self.message}"
