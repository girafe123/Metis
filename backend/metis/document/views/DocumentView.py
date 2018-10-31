from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views import generic
from ..models import Document
from ..services import DocumentService

class DocListView(generic.ListView):
    model = Document
    context_object_name = 'doc_list'
    queryset = DocumentService.getPublicDocumentList()
    template_name = 'document/index.html'
    paginate_by = 10

@login_required
def editor(request):
    return render(request, 'document/editor.html')

def detail(request, docId):
    doc = DocumentService.getDocumentById(docId)
    return render(request, 'document/detail.html', {
        'document': doc,
        'content': DocumentService.convertMarkdown(doc.content)
    })
