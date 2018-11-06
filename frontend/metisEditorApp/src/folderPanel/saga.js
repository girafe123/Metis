import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  getFolders,
  createFolder,
  updateFolder,
} from '../common/services/http';
import {
  GET_FOLDERS,
  GET_FOLDERS_SUCCEEDED,
  CREATE_FOLDER,
  CREATE_FOLDER_SUCCEEDED,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCEEDED,
  UPDATE_FOLDER,
  UPDATE_FOLDER_SUCCEEDED,
  toggleFoldersLoading,
} from './actions';
import { showMessage } from '../common/actions';
import { MessageType } from '../common/utils/Enums';

function* getFoldersList() {
  try {
    yield put(toggleFoldersLoading(true));
    const folders = yield call(getFolders, 'f');
    yield put({
      type: GET_FOLDERS_SUCCEEDED,
      payload: {
        folders,
      },
    });
  } catch (e) {
    yield put(showMessage('加载文件夹列表失败', MessageType.Error));
  } finally {
    yield put(toggleFoldersLoading(false));
  }
}

function* createFolderHandler(action) {
  try {
    yield put(toggleFoldersLoading(true));
    const folder = yield call(createFolder, action.payload.folder);
    yield put({
      type: CREATE_FOLDER_SUCCEEDED,
      payload: {
        folder,
      },
    });
    yield put(showMessage('创建文件夹成功', MessageType.Success));
  } catch (e) {
    yield put(showMessage('创建文件夹失败', MessageType.Error));
  } finally {
    yield put(toggleFoldersLoading(false));
  }
}

function* deleteFolderHandler(action) {
  try {
    yield put(toggleFoldersLoading(true));
    yield call(updateFolder, {
      id: action.payload.folderId,
      isDelete: true,
    });
    yield put({
      type: DELETE_FOLDER_SUCCEEDED,
      payload: {
        folderId: action.payload.folderId,
      },
    });
    yield put(showMessage('删除文件夹成功', MessageType.Success));
  } catch (e) {
    yield put(showMessage('删除文件夹失败', MessageType.Error));
  } finally {
    yield put(toggleFoldersLoading(false));
  }
}

function* updateFolderHandler(action) {
  try {
    yield put(toggleFoldersLoading(true));
    const folder = yield call(updateFolder, action.payload.folder);
    yield put({
      type: UPDATE_FOLDER_SUCCEEDED,
      payload: {
        folder,
      },
    });
    yield put(showMessage('更新文件夹成功', MessageType.Success));
  } catch (e) {
    yield put(showMessage('更新文件夹失败', MessageType.Error));
  } finally {
    yield put(toggleFoldersLoading(false));
  }
}

function* saga() {
  yield takeEvery(GET_FOLDERS, getFoldersList);
  yield takeEvery(CREATE_FOLDER, createFolderHandler);
  yield takeEvery(DELETE_FOLDER, deleteFolderHandler);
  yield takeEvery(UPDATE_FOLDER, updateFolderHandler);
}

export default saga;
