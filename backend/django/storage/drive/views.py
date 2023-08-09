import time
from pathlib import Path
import mimetypes

import secrets
from django.urls import path

from fileprovider.utils import sendfile

from django.utils.encoding import smart_str
from django.views.static import serve

from wsgiref.util import FileWrapper
from django.http import HttpResponse


from django.http import FileResponse
from django.core.exceptions import SuspiciousOperation
from django.http import HttpResponse

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import ParseError, NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.generic.detail import DetailView


from .models import FileInfo, CommonUrl
from .serializers import FileInfoSerializer, FileUploadSerializer, CommonUrlSerializer
from rest_framework import serializers

from decouple import config

from abc import ABC, abstractmethod





def get_safe_path(request, user_local_dir):
    username = request.user.username
    path = request.query_params.get('path')

    if not path:
        raise ValidationError(detail=f'Необходим параметр "path"')
    if '..' in path:
        raise PermissionDenied(detail='Доступ запрещен')

    # ROOT_DIR = Path(config('ROOT_DIR'))
    # full_path = ROOT_DIR / username / path
    full_path = user_local_dir / path

    if not full_path.exists():
        raise FileNotFoundError

    return full_path











class DriveBaseAPIView(APIView, ABC):

    # permission_classes = (ReadOnly, )
    # authentication_classes = (TokenAuthentication, )

    def __init__(self, local_path):
        super().__init__()
        ROOT_DIR = Path(config('ROOT_DIR'))
        self.full_path = ROOT_DIR / local_path

    @abstractmethod
    def set_full_path(self, request):
        pass

    def get(self, request, *args, **kwargs):
        operation = self.request.query_params.get('operation')
        if not operation:
            return Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        if operation == 'ls':
            if self.full_path.is_dir():
                files_list = []
                for entry_path in self.full_path.iterdir():
                    if entry_path.is_file():
                        entry_type = "File"
                    elif entry_path.is_dir():
                        entry_type = "Directory"
                    else:
                        continue

                    entry_stat = entry_path.stat()
                    entry_name = entry_path.name
                    size = entry_stat.st_size
                    mtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(entry_stat.st_mtime))
                    ctime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(entry_stat.st_ctime))
                    file_info = FileInfo(entry_name, entry_type, size, ctime, mtime)
                    files_list.append(file_info)

            serializer = FileInfoSerializer(files_list, many=True)
            return Response({'files': serializer.data})
        elif operation == 'download':
            try:
                mime_type, _ = mimetypes.guess_type(self.full_path)
                with self.full_path.open('rb') as f:
                    response = HttpResponse(f.read(),
                                            content_type=mime_type, # 'blob',  # mime_type,
                                            headers={
                                                "Content-Disposition": f'attachment; filename="{self.full_path.name}"',
                                            }
                                            )
                    return response
            except FileNotFoundError:
                return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print("MY SOQNLOADED ERROR = ", e)
                print("FUUL PATH = ", self.full_path)
                return Response({'detail': 'Error downloading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif operation == 'open':
            pass
        elif operation == 'share':
            random_url = secrets.token_hex(25)
            serializer = CommonUrlSerializer(data={
                'url': random_url,
                'local_path': str(self.full_path),
                'access_rights': 1,
            })
            if serializer.is_valid():
                print('lol kek')
                serializer.save()
        else:
            Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'result': 'aaa'})
    def post(self, request, *args, **kwargs):
        operation = self.request.query_params.get('operation')
        if not operation:
            return Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        if operation == 'create':
            file_type = request.data.get('file_type')
            file_name = request.data.get('file_name')
            if not file_type or not file_name:
                return Response({"error": 'Необходим ключ "file_type" и "file_name"'}, status=status.HTTP_400_BAD_REQUEST)

            new_file_path = self.full_path / file_name
            if new_file_path.exists():
                return Response({"error": "Файл с таким именем уже существует"}, status=status.HTTP_409_CONFLICT)

            if file_type == 'Directory':
                new_file_path.mkdir()
            elif file_type == 'File':
                with new_file_path.open(mode='w') as file:
                    data = request.data.get('file_content')
                    if data:
                        file.write(data)
            else:
                return Response({"error": 'Неправильный ключ "file_type" передан'}, status=status.HTTP_400_BAD_REQUEST)
        elif operation == 'upload':
            serializer = FileUploadSerializer(data=request.data)
            if serializer.is_valid():
                file = serializer.validated_data['file']
                file_name = file.name
                file_content = file.read()

                upload_path = self.full_path / file_name

                try:
                    with open(upload_path, 'wb') as destination:
                        destination.write(file_content)
                    return Response({'detail': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({'detail': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": 'Неправильный параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)


        return Response({'result': 'bbb'})

    def put(self, request, *args, **kwargs):
        operation = self.request.query_params.get('operation')
        if not operation:
            return Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        if operation == 'mv':
            destination = request.data.get('destination')
            if not destination:
                return Response({"error": 'Необходим параметр "destination"'}, status=status.HTTP_400_BAD_REQUEST)
            ROOT_DIR = Path(config('ROOT_DIR'))
            destination_path = ROOT_DIR / username / destination
            self.full_path.rename(destination_path)
        elif operation == 'update':
            if self.full_path.is_dir():
                return Response({"error": 'Нельзя засунуть текст в директорию'}, status=status.HTTP_400_BAD_REQUEST)
            with self.full_path.open(mode='w') as file:
                data = request.data.get('data')
                if data:
                    file.write(data)
        else:
            return Response({"error": 'Неправильный параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"result": "vvv"})

    def delete(self, request, *args, **kwargs):

        if self.full_path.is_dir():
            def remove_non_empty_directory(directory_path):
                try:
                    directory = Path(directory_path)
                    if directory.is_dir():
                        for item in directory.iterdir():
                            if item.is_file():
                                item.unlink()  # Удаляем файл
                            else:
                                remove_non_empty_directory(item)  # Удаляем вложенную директорию
                        directory.rmdir()  # Удаляем саму директорию
                        print(f"Директория {directory_path} успешно удалена.")
                    else:
                        print(f"{directory_path} не является директорией.")
                except Exception as e:
                    print(f"Ошибка при удалении директории {directory_path}: {e}")

            remove_non_empty_directory(self.full_path)
        elif self.full_path.is_file():
            self.full_path.unlink()
        else:
            return Response({"error": 'Удаляю не понятно что'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"result": "lll"})






class DrivePersonalAPIView(DriveBaseAPIView):

    permission_classes = (IsAuthenticated,) # (IsAuthenticatedOrReadOnly, )
    authentication_classes = (TokenAuthentication, )

    def __init__(self):
        super().__init__('')

    def set_full_path(self, request, *args, **kwargs):
        try:
            username = request.user.username
            full_path = get_safe_path(request, Path(config('ROOT_DIR')) / username)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except FileNotFoundError as e :
            return Response({"error": "Такого пути не существует"}, status=status.HTTP_404_NOT_FOUND)
        except SuspiciousOperation as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        self.username = username
        self.full_path = Path(full_path)

    def get(self, request, *args, **kwargs):
        self.set_full_path(request)
        return super().get(request)


    def post(self, request, *args, **kwargs):
        self.set_full_path(request)
        return super().post(request)

    def put(self, request, *args, **kwargs):
        self.set_full_path(request)
        return super().put(request)

    def delete(self, request, *args, **kwargs):
        self.set_full_path(request)
        return super().delete(request)



class DriveCommonAPIView(DriveBaseAPIView):

    # permission_classes = (IsAuthenticated,) # (IsAuthenticatedOrReadOnly, )
    # authentication_classes = (TokenAuthentication, )

    def __init__(self):
        super().__init__('')

    def set_full_path(self, request, *args, **kwargs):
        print("QWEQWEWQEQWE = ", args)
        try:
            common_url = args[0]
            if not common_url:
                return Response({"error": 'Необходим параметр "common_url"'}, status=status.HTTP_400_BAD_REQUEST)

            common_url_instance = CommonUrl.objects.get(url=common_url)

            username = request.user.username

            full_path = get_safe_path(request, self.full_path / common_url_instance.local_path)
            # full_path = common_url_instance.local_path

            # Проверка прав доступа, если необходимо
            access_rights = common_url_instance.access_rights
            # Ваш код для проверки прав доступа

        except CommonUrl.DoesNotExist:
            return Response({"error": "Такой common_url не найден"}, status=status.HTTP_404_NOT_FOUND)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except FileNotFoundError as e:
            return Response({"error": "Такого пути не существует"}, status=status.HTTP_404_NOT_FOUND)
        except SuspiciousOperation as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        self.username = username
        self.full_path = Path(full_path)

        # Установка прав доступа, если необходимо
        # self.access_rights = access_rights

    def get(self, request, *args, **kwargs):
        # print("common getgetggetgget = ", kwargs['common_url'])
        self.set_full_path(request, kwargs['common_url'])
        print("full path from common = ", self.full_path)
        return super().get(request)


    def post(self, request,*args, **kwargs):
        self.set_full_path(request, kwargs['common_url'])
        return super().post(request)

    def put(self, request, *args, **kwargs):
        self.set_full_path(request, kwargs['common_url'])
        return super().put(request)

    def delete(self, request, *args, **kwargs):
        self.set_full_path(request, kwargs['common_url'])
        return super().delete(request)
