# Generated by Django 2.1.1 on 2018-11-04 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0010_attachment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='folder',
            name='isRoot',
        ),
        migrations.AlterField(
            model_name='attachment',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]
