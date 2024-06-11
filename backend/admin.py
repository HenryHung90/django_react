from django.contrib import admin
from backend.models import ClassCategory, StudentAccount, StudentProgram

# Register your models here.
admin.site.register(ClassCategory)
admin.site.register(StudentAccount)
admin.site.register(StudentProgram)