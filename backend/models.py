from django.db import models
import uuid


# Create your models here.

# Class_Category
class ClassCategory(models.Model):
    cid = models.AutoField(primary_key=True, unique=True, editable=False)
    class_number = models.BigIntegerField(
        unique=True,
        verbose_name="屆數",
        help_text="第幾屆的分類"
    )
    student_count = models.IntegerField(default=0, verbose_name="該屆學生人數")
    is_active = models.BooleanField(default=True, verbose_name="是否啟用該屆所有帳號")

    class Meta:
        db_table = 'class_category'

    def __str__(self):
        return f'{self.class_number} {str(self.student_count)} {str(self.is_active)}'


# Student Account
class StudentAccount(models.Model):
    sid = models.AutoField(primary_key=True, unique=True, editable=False)
    class_number = models.BigIntegerField(
        unique=False,
        verbose_name="屆數",
        help_text="第幾屆的分類"
    )
    username = models.CharField(max_length=10, verbose_name="學生學號")
    name = models.CharField(max_length=50, verbose_name="學生姓名")
    join_date = models.DateField(auto_now_add=True)
    last_edit_date = models.DateField(auto_now=True)

    class Meta:
        db_table = 'student_account'

    def __str__(self):
        return f'{self.class_number} {str(self.username)} {str(self.name)} {str(self.sid)}'


# Program Content
class StudentProgram(models.Model):
    program_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sid = models.ForeignKey(StudentAccount, on_delete=models.CASCADE, related_name='programs', default=0)
    program_name = models.CharField(max_length=20)
    html_code = models.TextField(null=True, blank=True)
    javascript_code = models.TextField(null=True, blank=True)
    css_code = models.TextField(null=True, blank=True)
    join_date = models.DateField(auto_now_add=True)
    last_edit_date = models.DateField(auto_now=True)

    class Meta:
        db_table = 'student_program'

    def __str__(self):
        return f'{self.sid} {str(self.program_name)} {str(self.join_date)} {str(self.last_edit_date)}'
