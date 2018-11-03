from django.shortcuts import get_object_or_404
from django.utils import timezone
import markdown

from ..models import Document, DocumentProfile

def getDocumentList(author, folderId=None, isDelete=False):
    if folderId:
        return Document.objects.filter(folder=folderId, isDelete=isDelete, author=author).order_by('-createTime')
    return Document.objects.filter(isDelete=isDelete, author=author)

def getPublicDocumentList():
    return Document.objects.filter(isPublic=True, isDelete=False).order_by('-createTime')

def getDocumentById(id):
    return get_object_or_404(Document, pk=id)

def createDocument(data, user):
    docProfile = DocumentProfile()
    docProfile.save()
    doc = Document(title=data['title'],
                   content=data['content'],
                   createTime=timezone.now(),
                   updateTime=timezone.now(),
                   author=user,
                   type=data['type'],
                   folder=data['folder'],
                   profile=docProfile)
    doc.save()
    return doc

def updateDocument(id, data):
    doc = get_object_or_404(Document, pk=id)
    doc.title = data['title']
    doc.content = data['content']
    doc.updateTime = timezone.now()
    doc.save()
    return doc

def deleteDocument(id):
    doc = getDocumentById(id)
    if doc.isDelete:
        doc.delete()
    else:
        doc.isDelete = True
        doc.save()

def convertMarkdown(content):
    return  markdown.markdown(content)