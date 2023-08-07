import axios from 'axios';
import { FileInfo } from '../redux/store';

export const API_URL = 'http://localhost:8000/api/v1';
const HOSTNAME = 'http://localhost:8000';

interface ErrorResponse {
  error: string;
}

export async function login(username: string, password: string): Promise<any | ErrorResponse> {
  try {
    const response = await axios.post<any>(`${HOSTNAME}/auth/token/login/`, {
      username,
      password,
    });

    const token = response.data.auth_token;

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

export async function logout(): Promise<any | ErrorResponse> {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};

    const response = await axios.post<any>(`${HOSTNAME}/auth/token/logout/`, null, {
      headers,
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

export async function listFiles(path: string, operation: string): Promise<any | ErrorResponse> {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};

    const response = await axios.get<any>(`${API_URL}/drive`, {
      params: { path, operation },
      headers,
    });

    console.log("\n\n\n");
    console.log("uuuuuuuuu");
    console.log(response);
    return response.data.files;
  } catch (error: any) {
    console.log('pppppppppppppp');
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

export async function addFile(
  path: string,
  operation: string,
  fileData: { file_name: string; file_type: string, file_content: string } | any
): Promise<any | ErrorResponse> {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};

    if (operation === 'create') {
      const response = await axios.post<any>(
        `${API_URL}/drive`,
        {
          file_name: fileData.file_name,
          file_type: fileData.file_type,
          file_content: fileData.file_content
        },
        {
          params: { path, operation },
          headers,
        }
      );
      return response.data;
    } else if (operation === 'upload') {
      const formData = new FormData();
      formData.append('file', fileData);

      const response = await axios.post<any>(
      `${API_URL}/drive`,
          formData,
      {
        params: { path, operation: 'upload' },
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data', // Важно установить правильный Content-Type для загрузки файлов
        },
      }
    );
    return response.data;
    } else {
      alert('wrong operation in post!!!');
    }

  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

///////////////////////////////////////////////////////////////
async function uploadFile(path: string, selectedFile: File): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};


  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}
//////////////////////////////////////////////////////////////

export async function updateFile(
  path: string,
  operation: string,
  updateData: { destination: string; data: string }
): Promise<any | ErrorResponse> {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};

    const response = await axios.put<any>(
      `${API_URL}/drive`,
      {
        path,
        operation,
        destination: updateData.destination,
        data: updateData.data,
      },
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.detail };
    } else {
      return { error: 'An error occurred' };
    }
  }
}

export async function deleteFile(path: string): Promise<any | ErrorResponse> {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};

    const response = await axios.delete<any>(`${API_URL}/drive`, {
      params: { path },
      headers,
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

export default axios;
