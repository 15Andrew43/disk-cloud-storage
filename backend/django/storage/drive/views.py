import time
from pathlib import Path

from django.core.exceptions import SuspiciousOperation
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import ParseError, NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FileInfo
from .serializers import FileInfoSerializer
from rest_framework import serializers

from decouple import config


def get_username_path(request):
    username = request.user.username
    path = request.query_params.get('path')

    if not path:
        raise ValidationError(detail=f'Необходим параметр "path"')
    if '..' in path:
        raise PermissionDenied(detail='Доступ запрещен')

    ROOT_DIR = Path(config('ROOT_DIR'))
    full_path = ROOT_DIR / username / path

    if not full_path.exists():
        raise FileNotFoundError

    return username, full_path



class DriveAPIView(APIView):

    permission_classes = (IsAuthenticated,) # (IsAuthenticatedOrReadOnly, )
    authentication_classes = (TokenAuthentication, )
    def get(self, request):
        try:
            username, full_path = get_username_path(request)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except FileNotFoundError as e :
            return Response({"error": "Такого пути не существует"}, status=status.HTTP_404_NOT_FOUND)
        except SuspiciousOperation as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        operation = self.request.query_params.get('operation')
        if not operation:
            return Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        # print(full_path)
        # print(path)
        # print("\n\n\n")

        if operation == 'ls':
            if full_path.is_dir():
                files_list = []
                for entry_path in full_path.iterdir():
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
            pass
        elif operation == 'open':
            pass
        elif operation == 'share':
            pass
        else:
            Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'result': 'aaa'})
    def post(self, request):
        try:
            username, full_path = get_username_path(request)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except FileNotFoundError as e :
            return Response({"error": "Такого пути не существует"}, status=status.HTTP_404_NOT_FOUND)
        except SuspiciousOperation as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        operation = self.request.query_params.get('operation')
        if not operation:
            return Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)


        if operation == 'create':
            # get file_type and file_name
            file_type = request.data.get('file_type')
            file_name = request.data.get('file_name')
            if not file_type or not file_name:
                return Response({"error": 'Необходим ключ "file_type" и "file_name"'}, status=status.HTTP_400_BAD_REQUEST)

            new_file_path = full_path / file_name
            if new_file_path.exists():
                return Response({"error": "Файл с таким именем уже существует"}, status=status.HTTP_409_CONFLICT)

            if file_type == 'Directory':
                new_file_path.mkdir()
            elif file_type == 'File':
                with new_file_path.open(mode='w') as file:
                    data = request.data.get('data')
                    if data:
                        file.write(data)
            else:
                return Response({"error": 'Неправильный ключ "file_type" передан'}, status=status.HTTP_400_BAD_REQUEST)
        elif operation == 'upload':
            pass
        else:
            return Response({"error": 'Неправильный параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)


        return Response({'result': 'bbb'})

    def put(self, request, *args, **kwargs):
        try:
            username, full_path = get_username_path(request)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except FileNotFoundError as e :
            return Response({"error": "Такого пути не существует"}, status=status.HTTP_404_NOT_FOUND)
        except SuspiciousOperation as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        operation = self.request.query_params.get('operation')
        if not operation:
            return Response({"error": 'Необходим параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)



        if operation == 'mv':
            destination = request.data.get('destination')
            if not destination:
                return Response({"error": 'Необходим параметр "destination"'}, status=status.HTTP_400_BAD_REQUEST)
            ROOT_DIR = Path(config('ROOT_DIR'))
            destination_path = ROOT_DIR / username / destination
            full_path.rename(destination_path)
        elif operation == 'update':
            if full_path.is_dir():
                return Response({"error": 'Нельзя засунуть текст в директорию'}, status=status.HTTP_400_BAD_REQUEST)
            with full_path.open(mode='w') as file:
                data = request.data.get('data')
                if data:
                    file.write(data)
        else:
            return Response({"error": 'Неправильный параметр "operation"'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"result": "vvv"})

    def delete(self, request):
        try:
            username, full_path = get_username_path(request)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except PermissionDenied as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)
        except FileNotFoundError as e :
            return Response({"error": "Такого пути не существует"}, status=status.HTTP_404_NOT_FOUND)
        except SuspiciousOperation as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if full_path.is_dir():
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

            remove_non_empty_directory(full_path)
        elif full_path.is_file():
            full_path.unlink()
        else:
            return Response({"error": 'Удаляю не понятно что'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"result": "lll"})
