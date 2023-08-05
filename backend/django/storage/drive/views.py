from django.forms import model_to_dict
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import File
from .serializers import FileSerializer
from rest_framework import serializers


class FileAPIView(APIView):

    permission_classes = (IsAuthenticated,) # (IsAuthenticatedOrReadOnly, )
    # authentication_classes = (TokenAuthentication, )
    def get(self, request):
        # print(dict(serializers.CurrentUserDefault))
        lst = File.objects.all()
        return Response({'files': FileSerializer(lst, many=True).data})
    def post(self, request):
        serializer = FileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # file_new = File.objects.create(
        #     name=request.data['name'],
        #     n=request.data['n']
        # )

        return Response({'file': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "methos put not allowed"})
        try:
            instance = File.objects.get(pk=pk)
        except:
            return Response({"error": "methos put not exist"})

        serializer = FileSerializer(data=request.data, instance=instance)
        serializer.is_valid()
        serializer.save()
        return Response({"file": serializer.data})

    def delete(self, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "method delete not allowed"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            instance = File.objects.get(pk=pk)
            instance.delete()  # Удаление объекта
            return Response({"message": "File deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except File.DoesNotExist:
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)







# class FileAPIView(generics.ListAPIView):
#     queryset = File.objects.all()
#     serializer_class = FileSerializer