# Generated by Django 5.0.3 on 2024-07-12 13:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='points_purchase_rate',
        ),
    ]
