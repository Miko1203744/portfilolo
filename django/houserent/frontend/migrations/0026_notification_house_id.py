# Generated by Django 4.0 on 2024-01-30 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0025_rename_accepted_view_schedule_agent_accepted_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='house_id',
            field=models.IntegerField(default=0),
        ),
    ]