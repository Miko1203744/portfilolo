# Generated by Django 4.0 on 2024-01-25 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_user_is_agent'),
        ('frontend', '0018_delete_agent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agent_image', models.ImageField(default='static/images/default.jpg', upload_to='houses/')),
                ('agent_phone_number', models.CharField(default='000', max_length=50)),
                ('agent_workdone', models.IntegerField(default=1)),
                ('user', models.OneToOneField(default='1', on_delete=django.db.models.deletion.CASCADE, to='core.user')),
            ],
        ),
    ]
