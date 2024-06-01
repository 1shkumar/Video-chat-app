# from django.shortcuts import render

# # Create your views here.
from django.http import JsonResponse
from .utils import generate_agora_token
from agora_token_builder import RtcRole

def get_agora_token(request):
    channel_name = request.GET.get('channelName')
    uid = request.GET.get('uid')
    role = RtcRole.PUBLISHER if request.GET.get('role') == 'publisher' else RtcRole.SUBSCRIBER
    token = generate_agora_token(channel_name, uid, role)
    return JsonResponse({'token': token})
