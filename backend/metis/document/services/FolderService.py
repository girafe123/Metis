from django.shortcuts import get_object_or_404

from ..models import Folder

def getFolderById(id):
    return get_object_or_404(Folder, pk=id)

def getFolderList(author, isDelete=None):
    query = dict(author=author)
    if isDelete is not None:
        query['isDelete'] = isDelete

    return Folder.objects.filter(**query).order_by('-createTime')

def createFolder(data, author):
    folder = Folder(**data, author=author)
    folder.save()
    return folder

def deleteFolder(id):
    folder = getFolderById(id)
    folder.delete()