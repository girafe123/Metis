import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { updateDocument } from '../common/services/http';
import {
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCEEDED,
  toggleDocumentSaving,
} from './actions';
import { showMessage } from '../common/actions';
import { MessageType } from '../common/utils/Enums';

function* updateDocumentHandler(action) {
  try {
    yield put(toggleDocumentSaving(true));
    const newDocument = yield call(updateDocument, action.payload.doc);
    yield put({
      type: UPDATE_DOCUMENT_SUCCEEDED,
      payload: {
        doc: newDocument,
      },
    });
    yield put(showMessage('更新文档成功', MessageType.Success));
  } catch (e) {
    yield put(showMessage('更新文档失败', MessageType.Error));
  } finally {
    yield put(toggleDocumentSaving(false));
  }
}

function* saga() {
  yield takeEvery(UPDATE_DOCUMENT, updateDocumentHandler);
}

export default saga;
