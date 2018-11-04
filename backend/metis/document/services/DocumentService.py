from django.shortcuts import get_object_or_404
from django.utils import timezone
import markdown

from ..models import Document, DocumentProfile

def getDocumentList(author=None, folder=None, isDelete=None, isPublic=None):
    query = {}
    if author is not None:
        query['author'] = author
    if folder is not None:
        query['folder'] = folder
    if isPublic is not None:
        query['isPublic'] = isPublic
    if isDelete is not None:
        query['isDelete'] = isDelete

    return Document.objects.filter(**query).order_by('-createTime')

def getDocumentById(id):
    return get_object_or_404(Document, pk=id)

def createDocument(data, user):
    docProfile = DocumentProfile()
    docProfile.save()
    doc = Document(**data,
                   createTime=timezone.now(),
                   author=user,
                   profile=docProfile)
    doc.save()
    return doc

def deleteDocument(id):
    doc = getDocumentById(id)
    doc.delete()

def convertMarkdown(content):
    return  markdown.markdown(content)