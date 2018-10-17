from django.contrib import admin

# Register your models here.
from .models import Document, Folder

admin.site.register(Document)
admin.site.register(Folder)