from django.contrib import admin
from django.urls import path, include
from .views import api_root
from conversations.views import ChatCreateView

app_name = 'base_app'

urlpatterns = [
    path('', api_root, name='api-root'),
    path('conversation/', ChatCreateView.as_view(), name='chat-create'),  # POST /api/v1/conversation/
    path('conversations/', include('conversations.urls')),  # GET /api/v1/conversations/ and detail
    path('auth/', include('authentication.urls')),
]
