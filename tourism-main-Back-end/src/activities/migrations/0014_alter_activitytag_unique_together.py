# Generated by Django 5.0.3 on 2024-08-02 23:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('activities', '0013_alter_activitytag_activity'),
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='activitytag',
            unique_together={('tag', 'activity')},
        ),
    ]
