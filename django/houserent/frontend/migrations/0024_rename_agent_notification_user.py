# Generated by Django 4.0 on 2024-01-30 03:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0023_remove_notification_viewing_schedule'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='agent',
            new_name='user',
        ),
    ]