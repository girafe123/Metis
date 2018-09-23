from django.urls import path, re_path

from . import views
app_name = 'document'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:doc_id>', views.detail, name='detail'),
    path('create', views.create, name='create'),
    path('edit/<int:doc_id>', views.edit, name='edit'),
    path('edit/<int:doc_id>/delete', views.deleteHandler, name='deleteHandler'),
    path('update', views.editHandler, name='editHandler'),
]