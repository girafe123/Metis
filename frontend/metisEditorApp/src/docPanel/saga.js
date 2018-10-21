import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  updateDocument,
} from '../common/services/http';
import {
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCEEDED,
  toggleDocumentSaving,
} from './actions';

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
  } catch (e) {
  } finally {
    yield put(toggleDocumentSaving(false));
  }
}

function* saga() {
  yield takeEvery(UPDATE_DOCUMENT, updateDocumentHandler);
}

export default saga;
