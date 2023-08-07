import {combineReducers, createStore} from 'redux';

// Действия
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_USERNAME = 'SET_USERNAME';
const SET_CUR_PATH = 'SET_CUR_PATH';
const PUSH_TO_CUR_PATH = 'PUSH_TO_CUR_PATH';
const POP_FROM_CUR_PATH = 'POP_FROM_CUR_PATH';
const SET_FILE_LIST = 'SET_FILE_LIST';

// Создание действий
export const setIsAuth = (isAuth: boolean) => ({
  type: SET_IS_AUTH,
  payload: isAuth,
});

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: username,
});

export const setCurPath = (curPath: string[]) => ({
  type: SET_CUR_PATH,
  payload: curPath,
});

export const setFileList = (fileList: FileInfo[]) => ({
  type: SET_FILE_LIST,
  payload: fileList,
});

export const pushToCurPath = (pathSegment: string) => ({
  type: PUSH_TO_CUR_PATH,
  payload: pathSegment,
});

export const popFromCurPath = () => ({
  type: POP_FROM_CUR_PATH,
});

// Интерфейс для состояния
export interface FileInfo {
  name: string,
  file_type: string,
  size: number,
  created_time: string,
  modified_time: string
}

interface AppState {
  is_auth: boolean,
  username: string,
  cur_path: string[],
  file_list: FileInfo[]
}

// Инициальное состояние
const initialState: AppState = {
  is_auth: false,
  username: '',
  cur_path: ['./'],
  file_list: []
};

// Редьюсер
const appReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, is_auth: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_CUR_PATH:
      return { ...state, cur_path: action.payload };
    case SET_FILE_LIST:
      return { ...state, file_list: action.payload };
    case PUSH_TO_CUR_PATH:
      return { ...state, cur_path: [...state.cur_path, action.payload] };
    case POP_FROM_CUR_PATH:
      return { ...state, cur_path: state.cur_path.slice(0, -1) };
    default:
      return state;
  }
};

// Комбинирование редьюсеров, если нужно
const rootReducer = combineReducers({
  app: appReducer,
  // Другие редьюсеры, если есть
});

export const store = createStore(rootReducer);
// export default rootReducer;
