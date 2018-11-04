from django.utils import timezone
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import serializers

from ..services import FolderService
from ..models import Folder

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'name', 'createTime', 'updateTime', 'parentId', 'isDelete', 'isPublic')

    def create(self, validated_data):
        return FolderService.createFolder(validated_data, self.context['user'])

class FolderView(APIView):
    def get(self, request):
        isDelete = request.query_params.get('isDelete')
        result = FolderService.getFolderList(request.user, isDelete)
        serializer = FolderSerializer(result, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = request.data
        data['isDelete'] = False
        data['createTime'] = timezone.now()
        data['updateTime'] = timezone.now()
        serializer = FolderSerializer(data=data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class FolderDetailView(APIView):
    def put(self, request, pk):
        folder = FolderService.getFolderById(pk)
        data = request.data
        data['createTime'] = folder.createTime
        data['updateTime'] = timezone.now()

        serializer = FolderSerializer(folder, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        FolderService.deleteFolder(pk)
        return HttpResponse(status=204)