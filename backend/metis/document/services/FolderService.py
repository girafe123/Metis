from django.utils import timezone
from django.shortcuts import get_object_or_404
from ..models import Folder

def getFolderList(folderId = None):
    if folderId:
        folderList = Folder.objects.filter(parentId=folderId)
    else:
        folderList = Folder.objects.filter(isRoot=True)

    result = []

    for folder in folderList:
        subFolder = getFolderList(folder.id)
        dict = folder.toDict()
        dict['children'] = subFolder
        result.append(dict)

    return result

def getFolderById(id):
    return get_object_or_404(Folder, pk=id)

def createFolder(data, author):
    parentId = data['parentId']
    if parentId:
        isRoot = False
    else:
        isRoot = True

    folder = Folder(name=data['name'],
                    createTime=timezone.now(),
                    updateTime=timezone.now(),
                    isRoot=isRoot,
                    parentId=parentId,
                    isDelete=False,
                    isPublic=data['isPublic'],
                    author=author)
    folder.save()
    return folder

def deleteFolder(id):
    doc = getFolderById(id)
    doc.delete()