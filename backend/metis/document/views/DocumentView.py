from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from ..services import DocumentService

def index(request):
    doc_list = DocumentService.getDocumentList()
    return render(request, 'document/index.html', {'doc_list': doc_list})

@login_required
def editor(request):
    return render(request, 'document/editor.html')

def detail(request, docId):
    doc = DocumentService.getDocumentById(docId)
    return render(request, 'document/detail.html', {'document': doc})
