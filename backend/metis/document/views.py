from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import Document

# Create your views here.
def index(request):
    doc_list = Document.objects.all()
    return render(request, 'document/index.html', {'doc_list': doc_list})

def edit(request, doc_id):
    doc = get_object_or_404(Document, pk=doc_id)
    return render(request, 'document/edit.html', {'document': doc})

def create(request):
    return render(request, 'document/create.html')

def detail(request, doc_id):
    doc = get_object_or_404(Document, pk=doc_id)
    return render(request, 'document/detail.html', {'document': doc})

@require_http_methods(["POST"])
def editHandler(request):
    data = request.POST
    
    if data['id']:
        #is update
        doc = get_object_or_404(Document, pk=data['id'])
        doc.title = data['title']
        doc.content = data['content']
        doc.update_time = timezone.now()
        doc.save()
    else:
        doc = Document(title=data['title'], content=data['content'], create_time=timezone.now(), update_time=timezone.now())
        doc.save()
    return HttpResponseRedirect(reverse('document:detail', args=(doc.id,)))


@require_http_methods(["POST"])
def deleteHandler(request, doc_id):
    doc = get_object_or_404(Document, pk=doc_id)
    doc.delete()

    return HttpResponseRedirect(reverse('document:index'))
