# rest framework require
from django.http import HttpResponse
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# local file join
import os
import json
import uuid
from datetime import datetime

# ollama
import ollama

# User model
from django.contrib.auth.models import User
from backend.models import StudentAccount, ClassCategory, StudentProgram

# session-based Login require
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie

# serializers
from .serializers import (
    StudentAccountSerializer,
    ClassCategorySerializer,
    StudentProgramSerializerGetAll,
    StudentProgramSerializerGetOne,
)

# Create your views here.
"""
 Response Status List:
 1. 200: success
 2. 202: success but no process
 2. 400: client error
 3. 500: server error
"""


# tools function
def get_folder_size(folder_path):
    """
    取得資料夾的大小
    @params folder_path 資料夾路徑
    """
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(folder_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            total_size += os.path.getsize(fp)
    return total_size


def read_file(file_path):
    """
    取得 file 的內容
    @params file_path 檔案路徑
    """
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return f.read()
    return ''


@ensure_csrf_cookie
@api_view(['POST'])
def register(request):
    """
    新增並註冊一名學生
    request.data 內應包含
    1. username
    2. password
    3. class_number
    4. name
    """
    try:
        data = request.data
        # 檢測是否有 User 重複
        if User.objects.filter(username=data.get('username')).exists():
            return Response({'message': 'Username already exists', 'status': 400}, status=status.HTTP_400_BAD_REQUEST)

        # 創建 Django User
        user = User.objects.create_user(username=data.get('username'), password=data.get('password'))
        user.is_staff = False
        user.is_active = True
        user.is_superuser = False
        user.save()

        # 創建 StudentAccount
        serializer = StudentAccountSerializer(data=data)
        if serializer.is_valid():
            student_info = serializer.save()

            # 嘗試取得該 class_number, 若沒有則創建一個新的
            class_category, created = ClassCategory.objects.get_or_create(class_number=student_info.class_number)
            class_category.student_count += 1
            class_category.save()

            return Response(
                {
                    'message': f'創建成功\n學生屆數:{student_info.class_number}\n學生帳號:{student_info.username}',
                    'status': 200,
                },
                status=status.HTTP_200_OK
            )
        else:
            # 若創建有問題，則刪除剛剛 user 創建的動作
            user.delete()
            return Response({'message': serializer.errors, 'status': 400}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f'Register Error: {e}')
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# 登入系統
@api_view(['POST'])
def login_system(request):
    try:
        data = request.data
        acc = data.get('username')
        psw = data.get('password')

        # 確認帳號密碼是否為空
        if acc is None or psw is None or acc == '' or psw == '':
            return Response({'message': '帳號或密碼不得為空', 'status': 400}, status=status.HTTP_400_BAD_REQUEST)

        # 登入
        user = authenticate(username=acc, password=psw, request=request._request)
        student_info = StudentAccount.objects.get(username=acc)
        if user is None:
            return Response({'message': '無此用戶或帳號密碼錯誤', 'status': 403}, status=status.HTTP_403_FORBIDDEN)

        login(request._request, user)

        return Response({'message': student_info.name, 'status': 200}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f'Login Error: {e}')
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# 登出系統
@ensure_csrf_cookie
@api_view(['GET'])
def logout_system(request):
    try:
        if not request.user.is_authenticated:
            return Response({'message': '未有帳戶登入', 'status': 400}, status=status.HTTP_400_BAD_REQUEST)

        logout(request._request)
        return Response({'message': 'logout success', 'status': 200}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f'Logout Error: {e}')
        return Response({'Logout Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# @ensure_csrf_cookie
@api_view(['GET'])
def session_view(request):
    return Response({'isAuthenticated': request.user.is_authenticated}, status=200)


@api_view(['GET'])
def userinfo_view(request):
    student_info = StudentAccount.objects.get(username=request.user.username)
    return Response({'username': student_info.name}, status=200) if request.user.is_authenticated else (
        Response({'isAuthenticated': request.user.is_authenticated}, status=200))


#####################################################################################################################
#####################################################################################################################
# POST FUNCTION -----------------------------------------------------------------------------------------------------
# @ensure_csrf_cookie
@api_view(['POST'])
def ollama_ask(request):
    response = ollama.chat(
        model="llama3",
        messages=[
            {
                'role': 'system',
                'content': """
                You are ChatGPT helping the User with coding. 
                You are intelligent, helpful and an expert developer, 
                who always gives the correct answer and only does what instructed. 
                You always answer truthfully and don't make things up. 
                You always answer precisely and list all relevant information as much as possible.
                
                When responding to the following prompt, 
                please make sure to properly style your response using Github Flavored Markdown. 
                Use markdown syntax for things like headings, lists, colored text, code blocks, highlights etc. 
                Make sure not to mention markdown or styling in your actual response. 
                Make sure you always answer in Traditional Chinese.
                """
            },
            {
                'role': 'user',
                'content': request.data['message'],
            }
        ])
    return Response({'message': response['message']['content'], 'status': 200})


@api_view(['POST'])
def create_class_category(request):
    try:
        serializer = ClassCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data, 'status': 200}, status=status.HTTP_201_CREATED)
        return Response({'message': serializer.errors, 'status': 200}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'create_class_category Error: {e}')
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def studentprogram_create(request):
    """
    建立學生 Program 基本狀態
    """
    try:
        serializer = StudentProgramSerializerGetAll(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f'studentprogram_create Error: {e}')
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def studentprogram_update(request):
    try:
        data = json.loads(request.data.get('message'))

        # 儲存到資料庫，最新 Coding 資料
        student_info = StudentAccount.objects.get(username=request.user.username)
        student_program = StudentProgram.objects.get(sid=student_info.sid, program_id=data.get('program_id'))
        student_program.html_code = data.get('html_code')
        student_program.css_code = data.get('css_code')
        student_program.javascript_code = data.get('javascript_code')
        student_program.save()
        # 儲存到本地端，歷史資料
        # 本地資料位置
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # program_history
        student_program_dir = os.path.join(base_dir, 'program_history', f'{str(student_info.sid)}_{student_info.name}')
        # 創建學生專屬資料夾
        os.makedirs(student_program_dir, exist_ok=True)

        # 創建該 Program 資料夾
        program_id_dir = os.path.join(student_program_dir, data.get('program_id'))

        # 創建時序資料夾
        datetime_str = datetime.now().strftime('%Y%m%d_%H-%M-%S')
        datetime_dir = os.path.join(program_id_dir, datetime_str)
        os.makedirs(datetime_dir, exist_ok=True)

        # 創建 html, css, javascript 檔案
        # hex -> 創建不包含連字符的16進制
        # file_uuid = uuid.uuid4().hex
        html_file = os.path.join(datetime_dir, 'index.html')
        css_file = os.path.join(datetime_dir, 'style.css')
        javascript_file = os.path.join(datetime_dir, 'javascript.js')

        with open(html_file, 'w', newline='') as f:
            f.write(student_program.html_code)
        with open(css_file, 'w', newline='') as f:
            f.write(student_program.css_code)
        with open(javascript_file, 'w', newline='') as f:
            f.write(student_program.javascript_code)

        return Response({'message': 'success', 'status': 200}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f'studentprogram_create Error: {e}')
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


#####################################################################################################################
#####################################################################################################################
# GET FUNCTION -----------------------------------------------------------------------------------------------------
@api_view(['GET'])
def get_class_category(request):
    categories = ClassCategory.objects.all()
    serializer = ClassCategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Student Program
@api_view(['GET'])
def get_studentprogram_getall(request):
    """
    取得所有 StudentProgram 內容
    """
    try:
        student_info = StudentAccount.objects.get(username=request.user.username)
        program_list = StudentProgram.objects.filter(sid=student_info.sid)
        serializers = StudentProgramSerializerGetAll(program_list, many=True)
        return Response({'message': json.dumps(serializers.data), 'status': status.HTTP_200_OK},
                        status=status.HTTP_200_OK)

    except Exception as e:
        print(f'studentprogram_getall Error: {e}')
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_studentprogram_getone(request):
    """
    取得單一 StudentProgram 內容
    """
    try:
        # 獲取查詢參數
        program_id = request.query_params.get('program_id')
        if not program_id:
            return Response({'message': 'program_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        student_info = StudentAccount.objects.get(username=request.user.username)
        program = StudentProgram.objects.get(sid=student_info.sid, program_id=program_id)
        serializers = StudentProgramSerializerGetOne(program, many=False)
        return Response({'message': json.dumps(serializers.data), 'status': status.HTTP_200_OK},
                        status=status.HTTP_200_OK)

    except Exception as e:
        print(f'studentprogram_getall Error: {e}')
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_studentprogram_history(request):
    """
    取得 Student 的編輯紀錄
    """
    try:
        # 獲取查詢參數
        program_id = request.query_params.get('program_id')
        if not program_id:
            return Response({'message': 'program_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # 獲取學生資訊
        student_info = StudentAccount.objects.get(username=request.user.username)
        student_dir = f"{student_info.sid}_{student_info.name}"
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        program_dir = os.path.join(base_dir, 'program_history', student_dir, program_id)

        if not os.path.exists(program_dir):
            return Response({'message': 'Program directory not found'}, status=status.HTTP_404_NOT_FOUND)

        # 取得所有歷史紀錄
        history_data = []

        for program in os.listdir(program_dir):
            history_data.append({
                'time': program,
                'size': get_folder_size(os.path.join(program_dir, program)),
                'html_code': read_file(os.path.join(program_dir, program, 'index.html')),
                'css_code': read_file(os.path.join(program_dir, program, 'style.css')),
                'javascript_code': read_file(os.path.join(program_dir, program, 'javascript.js')),
            })

        return Response({'message': json.dumps(history_data), 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f'studentprogram_history Error: {e}')
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
