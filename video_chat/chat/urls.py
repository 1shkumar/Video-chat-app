from django.urls import path
from .views import get_agora_token

urlpatterns = [
    path('get_agora_token/', get_agora_token, name='get_agora_token'),
]
