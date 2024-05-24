from django.db import models


# Create your models here.

# Account
class Account(models.Model):
    classify = models.CharField(max_length=10)
    name = models.CharField(max_length=20, null=True, blank=True)
    acc = models.CharField(max_length=20)
    psw = models.CharField(max_length=20)

    class Meta:
        db_table = 'accounts'

    def __str__(self):
        return self.acc
