# Generated by Django 5.0.3 on 2024-07-26 22:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0007_ticket_canceled_ticket_crucial_field_modified'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='crucial_field_modified',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2024, 7, 26, 22, 23, 30, 230187, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
    ]
