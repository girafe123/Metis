from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import serializers

from ..services import FolderService
from ..models import Folder

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'name', 'isPublic', 'parentId')

    def create(self, validated_data):
        return FolderService.createFolder(validated_data, self.context['user'])

class FolderView(APIView):
    def get(self, request):
        result = FolderService.getFolderList()
        return JsonResponse(result, safe=False)

    def post(self, request):
        serializer = FolderSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class FolderDetailView(APIView):
    def getFolderById(self, id):
        return Folder.objects.get(pk=id)

    def put(self, request, pk):
        folder= self.getFolderById(pk)
        serializer = FolderSerializer(folder, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        FolderService.deleteFolder(pk)
        return HttpResponse(status=204)