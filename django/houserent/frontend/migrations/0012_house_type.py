# Generated by Django 4.0 on 2024-01-18 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0011_delete_house_delete_house_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='House_type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
                ('Icon', models.ImageField(default='default.jpg', upload_to='static/img')),
            ],
        ),
    ]
