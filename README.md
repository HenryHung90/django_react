# Django + React 整合指南

本指南提供了將 Django 後端與 React 前端進行整合的步驟和基礎知識。以下是整合的基本流程和一些常見問題的解決方法。

## 環境設定

1. **安裝 Django 和相關庫**：
   - 使用 PyCharm 安裝 Python 和 Anaconda。
   - 在虛擬環境中安裝 Django 和其他必要的庫：
     ```
     pip install django django-cors-headers djangorestframework
     ```

2. **創建 Django 專案**：
   - 使用以下命令創建一個 Django 專案：
     ```
     django-admin startproject django_tutorial
     ```

3. **前後端整合配置**：
   - 在 Django 專案的 `settings.py` 文件中進行配置，包括設置靜態文件、模板路徑和 CORS 等。

4. **創建 Django 應用**：
   - 使用以下命令創建一個 Django 應用：
     ```
     cd django_react
     python manage.py startapp backend
     ```

5. **配置 Django 路由**：
   - 在 `urls.py` 文件中配置 Django 的路由，包括 API 和 React 前端的路由。

6. **創建 React 應用**：
   - 使用 `create-react-app` 創建 React 專案：
     ```
     npx create-react-app frontend
     ```

## 基礎知識

1. **Django 默認使用 SQLite 作為數據庫**。
2. **Django 具有內置的後台管理系統**，可以通過創建超級用戶來訪問。
3. **TypeScript** 是一種 JavaScript 的超集，用於增強代碼的可讀性和可維護性。

## 解決常見問題

1. **Fatal Python error: init_stdio_encoding**：
   - 解決方法：在 PyCharm 的安裝目錄中的 `pycharm64.exe.vmoptions` 文件末尾添加 `-Dfile.encoding=UTF-8`。

## 文檔鏈接

- [Django 官方文檔](https://docs.djangoproject.com/en/5.0/)

以上是將 Django 和 React 整合的基本流程和常見問題的解決方法。你可以根據需要將這些內容整理到 GitHub 的 README.md 文件中，並根據項目的具體情況進行調整和補充。
