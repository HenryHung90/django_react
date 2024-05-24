from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('ollama_ask/', views.ollama_ask, name='ollama_ask'),
]
