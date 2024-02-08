from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    CHOICES = (
        ('M', 'M'),
        ('F', 'F'),
    )
    gender = models.CharField(max_length=1, choices=CHOICES, default="M")
    is_landlord = models.BooleanField(default=False)
    is_Tenante = models.BooleanField(default=False)
    is_agent = models.BooleanField(default=False)

    def __str__(self):
        return self.username
