from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import StudentAccount, ClassCategory


# Create your tests here.
class UserAccountTests(APITestCase):
    TEST_class_number = 112
    TEST_username = '1082020'
    TEST_name = '洪立恒'
    TEST_password = '1082020'

    # 測試註冊是否有效
    def test_register(self):
        # 反向解析 "register" 路由 獲取對應 URL
        url = reverse('register')
        data = {
            'class_number': self.TEST_class_number,
            'username': self.TEST_username,
            'name': self.TEST_name,
            'password': self.TEST_password
        }
        # 使用 REST framework 測試客戶端 POST 請求到 'register' URL, 並傳遞數據
        response = self.client.post(url, data, format='json')
        # assert HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert StudentAccount 數量是否為 1 (表示成功創建)
        self.assertEqual(StudentAccount.objects.count(), 1)
        # assert User 數量使否為 1 (表示成功創建)
        self.assertEqual(User.objects.count(), 1)
        # 從 StudentAccount 獲取 TEST_name 若有表示正確
        self.assertEqual(StudentAccount.objects.get().username, self.TEST_username)

        # 檢查 ClassCategory student_count 是否增加
        class_category = ClassCategory.objects.get(class_number=self.TEST_class_number)
        self.assertEqual(class_category.student_count, 1)

    # 測試缺少必要字段時的情況
    def test_register_missing_field(self):
        url = reverse('register')
        data = {
            'class_number': self.TEST_class_number,
            'username': self.TEST_username,
            'password': self.TEST_password
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(StudentAccount.objects.count(), 0)
        self.assertEqual(User.objects.count(), 0)

    # 測試重複用戶名的情況
    def test_register_duplicate_username(self):
        User.objects.create_user(username=self.TEST_username, password=self.TEST_password)
        url = reverse('register')
        data = {
            'class_number': self.TEST_class_number,
            'username': self.TEST_username,
            'name': self.TEST_name,
            'password': self.TEST_password
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(StudentAccount.objects.count(), 0)
        self.assertEqual(User.objects.count(), 1)

    # 測試成功登錄的情況
    def test_login(self):
        User.objects.create_user(username=self.TEST_username, password=self.TEST_password)
        url = reverse('login')
        data = {
            'username': self.TEST_username,
            'password': self.TEST_password,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # 測試使用無效憑據登錄的情況
    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {
            'username': self.TEST_username,
            'password': self.TEST_password
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # 測試成功登出已登錄的用戶
    def test_logout(self):
        user = User.objects.create_user(username=self.TEST_username, password=self.TEST_password)
        self.client.force_authenticate(user=user)
        url = reverse('logout')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # 測試在未登錄狀態下登出的情況
    def test_logout_not_logged_in(self):
        url = reverse('logout')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ClassCategoryTests(APITestCase):
    # 測試建立 class category
    def test_create_class_category(self):
        url = reverse('create_classCategory')
        data = {
            'class_number': 2024,
            'student_count': 50,
            'is_active': True
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ClassCategory.objects.count(), 1)
        self.assertEqual(ClassCategory.objects.get().class_number, 2024)

    # 測試取得 class category
    def test_get_class_categories(self):
        ClassCategory.objects.create(class_number=2024, student_count=50, is_active=True)
        ClassCategory.objects.create(class_number=2025, student_count=45, is_active=False)

        url = reverse('get_classCategory')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
