from rest_framework import serializers
from backend.models import StudentAccount, ClassCategory, StudentProgram


# Serializers
class StudentAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAccount
        fields = ['class_number', 'username', 'name', 'join_date', 'last_edit_date']
        read_only_field = ['join_date', 'last_edit_date']


class ClassCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassCategory
        fields = '__all__'


"""
取得所有 program 時只需顯示 名稱, id, 創建日期, 最後更改日期
"""
class StudentProgramSerializerGetAll(serializers.ModelSerializer):
    class Meta:
        model = StudentProgram
        fields = ['program_id', 'program_name', 'join_date', 'last_edit_date']


"""
取得單一 program 表示進入課程，給予課程 code
"""
class StudentProgramSerializerGetOne(serializers.ModelSerializer):
    class Meta:
        model = StudentProgram
        fields = ['html_code', 'javascript_code', 'css_code']
