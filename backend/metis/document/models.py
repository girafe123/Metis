from django.db import models

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    create_time = models.DateTimeField('create time')
    update_time = models.DateTimeField('update time')

    def __str__(self):
        return self.title