from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    Root endpoint - returns API info
    """
    return Response({
        'message': 'Board Game Rulebook Arbitrator API',
        'version': 'v1',
        'endpoints': {
            'auth': '/api/v1/auth/',
            'conversations': '/api/v1/conversations/',
        }
    })
