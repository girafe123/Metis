from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.apiDocumentList),
    path('<int:doc_id>', views.apiDocument),
    path('edit', views.apiEditDocument),
]