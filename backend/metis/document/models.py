from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Folder(models.Model):
    name = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    createTime = models.DateTimeField('create time')
    updateTime = models.DateTimeField('update time')
    parentId = models.IntegerField(blank=True, null=True)
    isDelete = models.BooleanField(default=False)
    isPublic = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class DocumentProfile(models.Model):
    viewCount = models.IntegerField(default=0)
    likeCount = models.IntegerField(default=0)

class Document(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    createTime = models.DateTimeField('create time')
    updateTime = models.DateTimeField('update time')
    type = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True)
    isDelete = models.BooleanField(default=False)
    isPublic = models.BooleanField(default=False)
    profile = models.OneToOneField(DocumentProfile, on_delete=models.CASCADE, blank=True, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title

class Attachment(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField()
    createTime = models.DateTimeField('create time')
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, blank=True, null=True)