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
  GET_DOCUMENT,
  GET_DOCUMENT_SUCCEEDED,
  CREATE_DOCUMENT,
  CREATE_DOCUMENT_SUCCEEDED,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCEEDED,
  toggleDocumentsLoading,
} from './actions';
import { actions as docPanelActions } from '../docPanel';
import { showMessage } from '../common/actions';
import { MessageType } from '../common/utils/Enums';

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
    yield put(showMessage('加载文档列表失败', MessageType.Error));
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
    yield put(showMessage('加载文档失败', MessageType.Error));
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
    yield put(showMessage('创建文档成功', MessageType.Success));
  } catch (e) {
    yield put(showMessage('创建文档失败', MessageType.Error));
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
    yield put(showMessage('删除文档成功', MessageType.Success));
  } catch (e) {
    yield put(showMessage('删除文档失败', MessageType.Error));
  }
}

function* saga() {
  yield takeEvery(GET_DOCUMENT_LIST, getDocumentList);
  yield takeEvery(GET_DOCUMENT, getCurrentDocument);
  yield takeEvery(CREATE_DOCUMENT, createDocumentHandler);
  yield takeEvery(DELETE_DOCUMENT, deleteDocumentHandler);
}

export default saga;
