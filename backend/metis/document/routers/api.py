from django.urls import path, re_path
from ..views import DocumentApiView, FolderApiView

urlpatterns = [
    path('document', DocumentApiView.DocumentView.as_view()),
    path('document/<int:pk>', DocumentApiView.DocumentDetailView.as_view()),
    path('folder', FolderApiView.FolderView.as_view()),
    path('folder/<int:pk>', FolderApiView.FolderDetailView.as_view()),
]