from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponseRedirect
from django.urls import reverse

from ..services import DocumentService

def index(request):
    doc_list = DocumentService.getDocumentList()
    return render(request, 'document/index.html', {'doc_list': doc_list})

def edit(request, docId):
    doc = DocumentService.getDocumentById(docId)
    return render(request, 'document/edit.html', {'document': doc})

def create(request):
    return render(request, 'document/create.html')

def detail(request, docId):
    doc = DocumentService.getDocumentById(docId)
    return render(request, 'document/detail.html', {'document': doc})

@require_http_methods(["POST"])
def editHandler(request):
    data = request.POST
    if data['id']:
        doc = DocumentService.updateDocument(data['id'], data);
    else:
        doc = DocumentService.createDocument(data)
    return HttpResponseRedirect(reverse('document:detail', args=(doc.id,)))

@require_http_methods(["POST"])
def deleteHandler(request, docId):
    DocumentService.deleteDocument(docId)
    return HttpResponseRedirect(reverse('document:index'))
