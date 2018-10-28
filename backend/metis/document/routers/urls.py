from django.urls import path, re_path
from ..views import DocumentView

urlpatterns = [
    path('', DocumentView.index, name='index'),
    path('editor', DocumentView.editor, name='editor'),
    path('<int:docId>', DocumentView.detail, name='detail'),
]