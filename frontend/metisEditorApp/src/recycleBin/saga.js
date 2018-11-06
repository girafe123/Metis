import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';

import { updateFolder, updateDocument, getFolders, getDocuments, deleteFolder, deleteDocument } from '../common/services/http';
import { showMessage } from '../common/actions';
import { MessageType } from '../common/utils/Enums';

import {
  QUERY_RECYLE_BIN,
  QUERY_RECYLE_BIN_SUCCEEDED,
  RESTORE_FOLDER_AND_DOCUMENT,
  DELETE_FOLDER_AND_DOCUMENT,
  toggleRecycleLoading,
  queryRecyleBin,
} from './actions';

import { actions as folderActions } from '../folderPanel';
import { actions as docActions } from '../docListPanel';

function* queryRecyleBinHandler(action) {
  try {
    yield put(toggleRecycleLoading(true));
    const folders = yield call(getFolders, 't');
    const documents = yield call(getDocuments, null, 't');
    yield put({
      type: QUERY_RECYLE_BIN_SUCCEEDED,
      payload: {
        documents,
        folders,
      },
    });
  } catch (e) {
  } finally {
    yield put(toggleRecycleLoading(false));
  }
}

function* restoreFolderAndDocHandler(action) {
  try {
    yield put(toggleRecycleLoading(true));
    const { folderIDs, docIDs } = action.payload;
    for (let i = 0, len = folderIDs.length; i < len; i++) {
      yield call(updateFolder, {
        id: folderIDs[i],
        isDelete: false,
      });
    }
    for (let i = 0, len = docIDs.length; i < len; i++) {
      yield call(updateDocument, {
        id: docIDs[i],
        isDelete: false,
      });
    }
    const state = yield select();
    yield put(showMessage('操作成功', MessageType.Success));
    yield put(folderActions.getFolders());
    if (state.editor.currentFolder) {
      yield put(docActions.getDocuments(state.editor.currentFolder.id));
    }
    yield put(queryRecyleBin());
  } catch (e) {
    yield put(showMessage('操作失败', MessageType.Error));
  }
}

function* deleteFolderAndDocHandler(action) {
  try {
    yield put(toggleRecycleLoading(true));
    const { folderIDs, docIDs } = action.payload;
    for (let i = 0, len = folderIDs.length; i < len; i++) {
      yield call(deleteFolder, folderIDs[i]);
    }
    for (let i = 0, len = docIDs.length; i < len; i++) {
      yield call(deleteDocument, docIDs[i]);
    }
    yield put(showMessage('操作成功', MessageType.Success));
    yield put(queryRecyleBin());
  } catch (e) {
    yield put(showMessage('操作失败', MessageType.Error));
  }
}

function* saga() {
  yield takeEvery(QUERY_RECYLE_BIN, queryRecyleBinHandler);
  yield takeEvery(RESTORE_FOLDER_AND_DOCUMENT, restoreFolderAndDocHandler);
  yield takeEvery(DELETE_FOLDER_AND_DOCUMENT, deleteFolderAndDocHandler);
}

export default saga;
