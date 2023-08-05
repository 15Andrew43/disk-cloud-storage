from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class File(models.Model):
    name = models.CharField(max_length=255)
    n = models.IntegerField()
    time_create = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

