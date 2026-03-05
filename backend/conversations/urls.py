from django.urls import path
from .views import ConversationListView, ConversationDetailView, MessageCreateView

app_name = 'conversations'

urlpatterns = [
    path('', ConversationListView.as_view(), name='conversation-list'),  # GET /api/v1/conversations/
    path('<int:_id>/', ConversationDetailView.as_view(), name='conversation-detail'),  # GET /api/v1/conversations/<id>/
    path('<int:conversation_id>/messages/', MessageCreateView.as_view(), name='message-create'),  # POST /api/v1/conversations/<id>/messages/
]
