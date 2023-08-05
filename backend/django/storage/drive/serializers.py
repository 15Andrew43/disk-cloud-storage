import io

from rest_framework import serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from .models import File

# class FileModel:
#     def __init__(self, name, n):
#         self.name = name
#         self.n = n

class FileSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    n = serializers.IntegerField()
    time_create = serializers.DateTimeField(read_only=True)
    user_id = serializers.IntegerField()
    # user = serializers.CurrentUserDefault() ## (default=serializers.CurrentUserDefault)


    def create(self, validated_data):
        return File.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.n = validated_data.get("n", instance.n)
        instance.time_create = validated_data.get("time_create", instance.time_create)
        instance.save()
        return instance

# def encode():
#     model = FileModel('ttttttt', 8888)
#     model_sr = FileSerializer(model)
#     print(model_sr)
#     print(model_sr.data)
#     json = JSONRenderer().render(model_sr.data)
#     print(json)
#
#
# def decode():
#     stream = io.BytesIO(b'{"name":"ttttttt","n":8888}')
#     data = JSONParser().parse(stream)
#     print(data)
#     serializer = FileSerializer(data=data)
#     serializer.is_valid()
#     print(serializer.validated_data)
