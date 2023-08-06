import axios from 'axios';
import {FileInfo} from '../redux/store';

const API_URL = 'http://127.0.0.1:8000/api/v1'; // Замените на ваш URL API
const HOSTNAME = 'http://127.0.0.1:8000';



interface ApiResponse<T> {
  data: T;
}

interface ErrorResponse {
  error: string;
}

export async function login(username: string, password: string): Promise<ApiResponse<string> | ErrorResponse> {
  try {
    const response = await axios.post<ApiResponse<string>>(`${HOSTNAME}/auth/token/login/`, {
      username,
      password,
    });
    const token = response.data.data;

    // Сохраняем токен в локальном хранилище
    localStorage.setItem('token', token);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

export async function logout(token: string): Promise<ApiResponse<string> | ErrorResponse> {
  try {
    const response = await axios.post<ApiResponse<string>>(`${HOSTNAME}/auth/token/logout/`, {}, {
      headers: { Authorization: `Token ${token}` },
    });
    localStorage.removeItem('token');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}


export async function listFiles(path: string, operation: string): Promise<ApiResponse<FileInfo[]> | ErrorResponse> {
  try {
    const response = await axios.get<ApiResponse<FileInfo[]>>(`${API_URL}/drive`, {
      params: { path, operation },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

export async function addFile(path: string, operation: string, fileData: { file_name: string, file_type: string }): Promise<ApiResponse<string> | ErrorResponse> {
  try {
    const response = await axios.post<ApiResponse<string>>(`${API_URL}/drive`, {
      path,
      operation,
      file_name: fileData.file_name,
      file_type: fileData.file_type,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

export async function updateFile(path: string, operation: string, updateData: { destination: string, data: string }): Promise<ApiResponse<string> | ErrorResponse> {
  try {
    const response = await axios.put<ApiResponse<string>>(`${API_URL}/drive`, {
      path,
      operation,
      destination: updateData.destination,
      data: updateData.data,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

export async function deleteFile(path: string): Promise<ApiResponse<string> | ErrorResponse> {
  try {
    const response = await axios.delete<ApiResponse<string>>(`${API_URL}/drive`, {
      params: { path },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}
