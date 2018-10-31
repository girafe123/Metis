from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.core.files import File

from .DocumentService import getDocumentById
from ..models import Attachment

def createAttachment(file, user, documentId):
    doc = getDocumentById(documentId)
    attachment = Attachment(name=file.name, file=File(file.file), createTime=timezone.now(), document=doc, author=user)
    attachment.save()
    return attachment

def getAttachmentList(docId=None):
    if docId:
        return Attachment.objects.filter(document=docId).order_by('-createTime')
    return Attachment.objects.all()

def deleteAttachment(id=None):
    att = get_object_or_404(Attachment, pk=id)
    att.delete()