from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


class ChatCreateView(generics.CreateAPIView):
    """
    POST /api/v1/conversations/
    Create a new conversation with initial message
    """
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        title = request.data.get('title', 'New Conversation')
        message_content = request.data.get('message', '')
        message_role = request.data.get('role', 'user')

        conversation = Conversation.objects.create(
            title=title,
            user=request.user
        )

        if message_content:
            Message.objects.create(
                conversation=conversation,
                role=message_role,
                content=message_content
            )

        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ConversationListView(generics.ListAPIView):
    """
    GET /api/v1/conversations/
    List all conversations for the authenticated user
    """
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)


class ConversationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /api/v1/conversations/<id>/
    Retrieve, update or delete a specific conversation
    """
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = '_id'

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)


class MessageCreateView(generics.CreateAPIView):
    """
    POST /api/v1/conversations/<id>/messages/
    Add a new message to a conversation
    """
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        conversation_id = self.kwargs.get('conversation_id')
        try:
            conversation = Conversation.objects.get(_id=conversation_id, user=self.request.user)
            serializer.save(conversation=conversation)
        except Conversation.DoesNotExist:
            raise generics.ValidationError("Conversation not found")
