# Generated by Django 4.0 on 2024-01-30 03:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0022_view_schedule_accepted_view_schedule_rejected'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='viewing_schedule',
        ),
    ]
