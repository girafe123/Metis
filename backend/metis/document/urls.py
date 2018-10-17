from django.urls import path, include
from .views import DocumentView
from .routers import api, urls

app_name = 'document'

urlpatterns = [
    path('', include(urls.urlpatterns)),
    path('api/', include(api.urlpatterns)),
]