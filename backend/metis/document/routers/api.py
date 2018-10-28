from django.urls import path
from ..views import DocumentApiView, FolderApiView, AttachmentApiView

urlpatterns = [
    path('document', DocumentApiView.DocumentView.as_view()),
    path('document/<int:pk>', DocumentApiView.DocumentDetailView.as_view()),
    path('folder', FolderApiView.FolderView.as_view()),
    path('folder/<int:pk>', FolderApiView.FolderDetailView.as_view()),
    path('upload', AttachmentApiView.AttachmentView.as_view()),
    path('upload/<int:pk>', AttachmentApiView.AttachmentDetailView.as_view()),
]