import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getDocuments } from '../services/http';

const GET_DOCUMENT_LIST = 'GET_DOCUMENT_LIST';
const GET_DOCUMENT_LIST_SUCCEEDED = 'GET_DOCUMENT_LIST_SUCCEEDED';
const GET_DOCUMENT_LIST_FAILED = 'GET_DOCUMENT_LIST_FAILED';

function* getDocumentList(action) {
   try {
      const documentList = yield call(getDocuments);
      yield put({type: GET_DOCUMENT_LIST_SUCCEEDED, documentList});
   } catch (e) {
      yield put({type: GET_DOCUMENT_LIST_FAILED, message: e.message});
   }
}

function* saga() {
  yield takeEvery(GET_DOCUMENT_LIST, getDocumentList);
}

export default saga;