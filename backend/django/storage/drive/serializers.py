from rest_framework import serializers

from .models import CommonUrl

class CommonUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonUrl
        fields = ['id', 'url', 'local_path', 'access_rights']



class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class FileInfoSerializer(serializers.Serializer):
    name = serializers.CharField()
    file_type = serializers.CharField()
    size = serializers.IntegerField()
    created_time = serializers.TimeField(format='%H:%M:%S')
    modified_time = serializers.TimeField(format='%H:%M:%S')

    def to_dict(self):
        return self.data

# Пример данных
# data = {
#     'name': 'example',
#     'file_typ': 'file',
#     'size': 1024,
#     'created_time': time(10, 30, 0),
#     'modified_time': time(15, 45, 0),
# }
#
# serializer = FileSystemEntrySerializer(data=data)
# serializer.is_valid()  # Проверка валидности данных

# Преобразование в объект FileSystemEntry
# entry = FileSystemEntry(**serializer.validated_data)