from django.urls import path
from . import views

urlpatterns = []

API_POST = [
    # User 常規操作
    path('register/', views.register, name='register'),
    path('login/', views.login_system, name='login'),
    path('logout/', views.logout_system, name='logout'),
    # Ollama 相關
    path('ollama_ask/', views.ollama_ask, name='ollama_ask'),
    # ClassCategory 相關
    path('create_classcategory/', views.create_class_category, name='create_classCategory'),
    # WorkPlace 相關
    path('studentprogram/create/', views.studentprogram_create, name='studentprogram_create'),
    path('studentprogram/update/', views.studentprogram_update, name='studentprogram_update'),
]

API_GET = [
    # User Session 相關
    path('get_session/', views.session_view, name='session_view'),
    path('get_userinfo/', views.userinfo_view, name='userinfo_view'),
    # ClassCategory 相關
    path('get_classcategory', views.get_class_category, name='get_classCategory'),
    # WorkPlace 相關
    path('studentprogram/getall/', views.get_studentprogram_getall, name='studentprogram_getall'),
    path('studentprogram/getone/', views.get_studentprogram_getone, name='studentprogram_getone'),
    path('studentprogram/gethistory/', views.get_studentprogram_history, name='studentprogram_history'),
]

urlpatterns += API_POST + API_GET
