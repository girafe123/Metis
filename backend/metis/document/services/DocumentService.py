from django.shortcuts import get_object_or_404
from django.utils import timezone
from ..models import Document, DocumentProfile

def getDocumentList(folderId=None):
    if folderId:
        return Document.objects.filter(folder=folderId).order_by('-createTime')
    return Document.objects.all()

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
    doc.delete()
