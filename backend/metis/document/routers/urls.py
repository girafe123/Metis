from django.urls import path, re_path
from ..views import DocumentView

urlpatterns = [
    path('', DocumentView.index, name='index'),
    path('<int:docId>', DocumentView.detail, name='detail'),
    path('create', DocumentView.create, name='create'),
    path('edit/<int:docId>', DocumentView.edit, name='edit'),
    path('edit/<int:docId>/delete', DocumentView.deleteHandler, name='deleteHandler'),
    path('update', DocumentView.editHandler, name='editHandler'),
]