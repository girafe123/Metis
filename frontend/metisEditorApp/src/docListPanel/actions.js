export const GET_DOCUMENT_LIST = 'GET_DOCUMENT_LIST';
export const GET_DOCUMENT_LIST_SUCCEEDED = 'GET_DOCUMENT_LIST_SUCCEEDED';
export const GET_DOCUMENT_LIST_FAILED = 'GET_DOCUMENT_LIST_FAILED';
export function getDocuments(folderId) {
  return {
    type: GET_DOCUMENT_LIST,
    payload: { folderId },
  };
}

export const TOGGLE_DOCUMENT_LIST_LOADING = 'TOGGLE_DOCUMENT_LIST_LOADING';
export function toggleDocumentsLoading(show) {
  return {
    type: TOGGLE_DOCUMENT_LIST_LOADING,
    payload: { show },
  };
}

export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const CREATE_DOCUMENT_SUCCEEDED = 'CREATE_DOCUMENT_SUCCEEDED';
export function createDocument(doc) {
  return {
    type: CREATE_DOCUMENT,
    payload: { doc },
  };
}

export const GET_DOCUMENT = 'GET_DOCUMENT';
export const GET_DOCUMENT_SUCCEEDED = 'GET_DOCUMENT_SUCCEEDED';
export const GET_DOCUMENT_FAILED = 'GET_DOCUMENT_FAILED';
export function getDocument(docId) {
  return {
    type: GET_DOCUMENT,
    payload: { docId },
  };
}

export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_SUCCEEDED = 'DELETE_DOCUMENT_SUCCEEDED';
export function deleteDocument(docId) {
  return {
    type: DELETE_DOCUMENT,
    payload: { docId },
  };
}
