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



class FileInfo:
    def __init__(self, name, file_type, size, created_time, modified_time):
        self.name = name
        self.file_type = file_type
        self.size = size
        self.created_time = created_time
        self.modified_time = modified_time

    def __repr__(self):
        return f"|Name: {self.name}, Type: {self.file_type}, Size: {self.size} bytes, MTime: {self.modified_time}, CTime: {self.created_time}|"