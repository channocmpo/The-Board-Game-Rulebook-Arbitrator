from django.urls import path
from .views import register_view, MyTokenObtainPairView, user_info_view

app_name = 'authentication'

urlpatterns = [
    path('signup/', register_view, name='register'),  # POST /api/v1/auth/signup/
    path('signin/', MyTokenObtainPairView.as_view(), name='token-obtain-pair'),  # POST /api/v1/auth/signin/
    path('me/', user_info_view, name='user-info'),  # GET /api/v1/auth/me/
]
