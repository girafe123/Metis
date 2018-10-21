import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  getDocuments,
  getDocument,
  createDocument,
  deleteDocument,
} from '../common/services/http';
import {
  GET_DOCUMENT_LIST,
  GET_DOCUMENT_LIST_SUCCEEDED,
  GET_DOCUMENT_LIST_FAILED,
  GET_DOCUMENT,
  GET_DOCUMENT_SUCCEEDED,
  GET_DOCUMENT_FAILED,
  CREATE_DOCUMENT,
  CREATE_DOCUMENT_SUCCEEDED,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCEEDED,
  toggleDocumentsLoading,
} from './actions';
import { actions as docPanelActions } from '../docPanel';

const { toggleDocumentLoading } = docPanelActions;

function* getDocumentList(action) {
  try {
    yield put(toggleDocumentsLoading(true));
    const documentList = yield call(getDocuments, action.payload.folderId);
    yield put({
      type: GET_DOCUMENT_LIST_SUCCEEDED,
      payload: {
        documentList,
      },
    });
  } catch (e) {
    yield put({
      type: GET_DOCUMENT_LIST_FAILED,
      message: e.message,
    });
  } finally {
    yield put(toggleDocumentsLoading(false));
  }
}

function* getCurrentDocument(action) {
  try {
    yield put(toggleDocumentLoading(true));
    const currentDocument = yield call(getDocument, action.payload.docId);
    yield put({
      type: GET_DOCUMENT_SUCCEEDED,
      payload: {
        currentDocument,
      },
    });
  } catch (e) {
    yield put({
      type: GET_DOCUMENT_FAILED,
      message: e.message,
    });
  } finally {
    yield put(toggleDocumentLoading(false));
  }
}

function* createDocumentHandler(action) {
  try {
    yield put(toggleDocumentLoading(true));
    const currentDocument = yield call(createDocument, action.payload.doc);
    yield put({
      type: CREATE_DOCUMENT_SUCCEEDED,
      payload: {
        currentDocument,
      },
    });
    yield put(showMessage('保存成功', 'success'));
  } catch (e) {
  } finally {
    yield put(toggleDocumentLoading(false));
  }
}

function* deleteDocumentHandler(action) {
  try {
    yield call(deleteDocument, action.payload.docId);
    yield put({
      type: DELETE_DOCUMENT_SUCCEEDED,
      payload: {
        id: action.payload.docId,
      },
    });
  } catch (e) {
  } finally {
  }
}

function* saga() {
  yield takeEvery(GET_DOCUMENT_LIST, getDocumentList);
  yield takeEvery(GET_DOCUMENT, getCurrentDocument);
  yield takeEvery(CREATE_DOCUMENT, createDocumentHandler);
  yield takeEvery(DELETE_DOCUMENT, deleteDocumentHandler);
}

export default saga;
