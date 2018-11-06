export const QUERY_RECYLE_BIN = 'QUERY_RECYLE_BIN';
export const QUERY_RECYLE_BIN_SUCCEEDED = 'QUERY_RECYLE_BIN_SUCCEEDED';
export function queryRecyleBin() {
  return {
    type: QUERY_RECYLE_BIN,
  };
}

export const RESTORE_FOLDER_AND_DOCUMENT = 'RESTORE_FOLDER_AND_DOCUMENT';
export const RESTORE_FOLDER_AND_DOCUMENT_SUCCEEDED = 'RESTORE_FOLDER_AND_DOCUMENT_SUCCEEDED';
export function restoreFolderAndDocument(folderIDs, docIDs) {
  return {
    type: RESTORE_FOLDER_AND_DOCUMENT,
    payload: {
      folderIDs, docIDs,
    },
  };
}

export const DELETE_FOLDER_AND_DOCUMENT = 'DELETE_FOLDER_AND_DOCUMENT';
export const DELETE_FOLDER_AND_DOCUMENT_SUCCEEDED = 'DELETE_FOLDER_AND_DOCUMENT_SUCCEEDED';
export function deleteFolderAndDocument(folderIDs, docIDs) {
  return {
    type: DELETE_FOLDER_AND_DOCUMENT,
    payload: {
      folderIDs, docIDs,
    },
  };
}

export const TOGGLE_RECYCLE_LOADING = 'TOGGLE_RECYCLE_LOADING';
export function toggleRecycleLoading(show) {
  return {
    type: TOGGLE_RECYCLE_LOADING,
    payload: { show },
  };
}
