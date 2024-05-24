from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Account
from .serializers import AccountSerializer

import ollama


# Create your views here.
# class AccountViewSet(viewsets.ModelViewSet):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer
#
#     def post(self, request, *args, **kwargs):
#         print(request.data)
#         return Response(request.data)


@api_view(['POST'])
def login(request):
    # print(request.data)
    return Response({'message': 'Hello World', 'status': 200})


@api_view(['POST'])
def ollama_ask(request):
    response = ollama.chat(model="llama3", messages=[{
        'role': 'user',
        'content': request.data['message']['content'],
    }])
    return Response({'message': response['message']['content'], 'status': 200})
