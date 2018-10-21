import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
} from '../common/services/http';
import {
  showMessage,
  hideMessage,
} from '../common/actions';
import {
  GET_FOLDERS,
  GET_FOLDERS_SUCCEEDED,
  GET_FOLDERS_FAILED,
  CREATE_FOLDER,
  CREATE_FOLDER_SUCCEEDED,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCEEDED,
  UPDATE_FOLDER,
  UPDATE_FOLDER_SUCCEEDED,
  toggleFoldersLoading,
} from './actions';

function* getFoldersList() {
  try {
    yield put(toggleFoldersLoading(true));
    const folders = yield call(getFolders);
    yield put({
      type: GET_FOLDERS_SUCCEEDED,
      payload: {
        folders,
      },
    });
  } catch (e) {
    yield put({
      type: GET_FOLDERS_FAILED,
      message: e.message,
    });
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
    yield put(showMessage('保存成功'));
  } catch (e) {
  } finally {
    yield put(toggleFoldersLoading(false));
  }
}

function* deleteFolderHandler(action) {
  try {
    yield put(toggleFoldersLoading(true));
    yield call(deleteFolder, action.payload.folderId);
    yield put({
      type: DELETE_FOLDER_SUCCEEDED,
      payload: {
        folderId: action.payload.folderId,
      },
    });
    yield put(showMessage('删除成功', 'success'));
  } catch (e) {

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
    yield put(showMessage('保存成功'));
  } catch (e) {
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
