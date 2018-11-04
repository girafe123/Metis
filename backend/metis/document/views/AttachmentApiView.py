from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework import serializers
from ..services import AttachmentService
from ..models import Attachment

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'name', 'file')

class AttachmentView(APIView):
    parser_classes = (MultiPartParser,)

    def get(self, request):
        doc = request.query_params.get('doc')
        att_list = AttachmentService.getAttachmentList(doc)
        serializer = AttachmentSerializer(att_list, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        files = request.FILES['attachments']
        documentId = request.POST['document']
        att = AttachmentService.createAttachment(files, request.user, documentId)
        serializer = AttachmentSerializer(att)
        return JsonResponse(serializer.data, safe=False, status=201)

class AttachmentDetailView(APIView):
    def delete(self, request, pk):
        AttachmentService.deleteAttachment(pk)
        return HttpResponse(status=204)