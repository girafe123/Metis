from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import serializers
from django.utils import timezone
from ..services import DocumentService
from ..models import Document

class DocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'title', 'updateTime', 'type', 'isPublic', 'isDelete')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'title', 'updateTime', 'type', 'content', 'isPublic', 'isDelete', 'folder')

    def create(self, validated_data):
        return DocumentService.createDocument(validated_data, self.context['user'])

class DocumentView(APIView):
    def get(self, request):
        folder = request.query_params.get('folder')
        isDelete = request.query_params.get('isDelete')
        isPublic = request.query_params.get('isPublic')
        doc_list = DocumentService.getDocumentList(author=request.user, folder=folder, isDelete=isDelete, isPublic=isPublic)
        serializer = DocumentListSerializer(doc_list, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        request.data['updateTime'] = timezone.now()
        serializer = DocumentSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class DocumentDetailView(APIView):
    def get(self, request, pk):
        doc = DocumentService.getDocumentById(pk)
        serializer = DocumentSerializer(doc)
        return JsonResponse(serializer.data)

    def put(self, request, pk):
        doc = DocumentService.getDocumentById(pk)
        request.data['updateTime'] = timezone.now()

        serializer = DocumentSerializer(doc, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        DocumentService.deleteDocument(pk)
        return HttpResponse(status=204)