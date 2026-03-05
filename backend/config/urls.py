"""
Main URL Router for the project
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def root_view(request):
    """Root API endpoint"""
    return Response({
        'message': 'Board Game Rulebook Arbitrator API',
        'version': 'v1',
        'api_endpoint': '/api/v1/'
    })


urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api/v1/', include('base_app.urls')),
]
