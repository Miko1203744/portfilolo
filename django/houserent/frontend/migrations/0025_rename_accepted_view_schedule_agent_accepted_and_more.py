# Generated by Django 4.0 on 2024-01-30 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0024_rename_agent_notification_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='view_schedule',
            old_name='accepted',
            new_name='agent_accepted',
        ),
        migrations.RenameField(
            model_name='view_schedule',
            old_name='rejected',
            new_name='agent_rejected',
        ),
        migrations.AddField(
            model_name='view_schedule',
            name='houseowner_accepted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='view_schedule',
            name='houseowner_rejected',
            field=models.BooleanField(default=False),
        ),
    ]
