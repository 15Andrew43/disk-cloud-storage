from django.contrib.auth.models import User
from django.db import models


class FileInfo:
    def __init__(self, name, file_type, size, created_time, modified_time):
        self.name = name
        self.file_type = file_type
        self.size = size
        self.created_time = created_time
        self.modified_time = modified_time

    def __repr__(self):
        return f"|Name: {self.name}, Type: {self.file_type}, Size: {self.size} bytes, MTime: {self.modified_time}, CTime: {self.created_time}|"


class CommonUrl(models.Model):
    owner = models.CharField(max_length=100, unique=True)
    url = models.CharField(max_length=255, unique=True)
    local_path = models.CharField(max_length=255)
    access_rights = models.PositiveIntegerField()

    def __repr__(self):
        return self.url