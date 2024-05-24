# Django + React 整合指南

本指南提供了将 Django 后端与 React 前端进行整合的步骤和基础知识。以下是整合的基本流程和一些常见问题的解决方法。

## 环境设置

1. **安装 Django 和相关库**：
   - 使用 PyCharm 安装 Python 和 Anaconda。
   - 在虚拟环境中安装 Django 和其他必要的库：
     ```
     pip install django django-cors-headers djangorestframework
     ```

2. **创建 Django 项目**：
   - 使用以下命令创建一个 Django 项目：
     ```
     django-admin startproject django_tutorial
     ```

3. **前后端整合配置**：
   - 在 Django 项目的 `settings.py` 文件中进行配置，包括设置静态文件、模板路径和 CORS 等。

4. **创建 Django App**：
   - 使用以下命令创建一个 Django App：
     ```
     cd django_react
     python manage.py startapp backend
     ```

5. **配置 Django 路由**：
   - 在 `urls.py` 文件中配置 Django 的路由，包括 API 和 React 前端的路由。

6. **创建 React App**：
   - 使用 `create-react-app` 创建 React 项目：
     ```
     npx create-react-app frontend
     ```

## 基础知识

1. **Django 默认使用 SQLite 作为数据库**。
2. **Django 具有内置的后台管理系统**，可以通过创建超级用户来访问。
3. **TypeScript** 是一种 JavaScript 的超集，用于增强代码的可读性和可维护性。

## 解决常见问题

1. **Fatal Python error: init_stdio_encoding**：
   - 解决方法：在 PyCharm 的安装目录中的 `pycharm64.exe.vmoptions` 文件末尾添加 `-Dfile.encoding=UTF-8`。

## 文档链接

- [Django 官方文档](https://docs.djangoproject.com/en/5.0/)

以上是将 Django 和 React 整合的基本流程和常见问题的解决方法。你可以根据需要将这些内容整理到 GitHub 的 README.md 文件中，并根据项目的具体情况进行调整和补充。
