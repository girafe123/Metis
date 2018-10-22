export const GET_FOLDERS = 'GET_FOLDERS';
export const GET_FOLDERS_SUCCEEDED = 'GET_FOLDERS_SUCCEEDED';
export function getFolders() {
  return {
    type: GET_FOLDERS,
  };
}

export const TOGGLE_FOLDERS_LOADING = 'TOGGLE_FOLDERS_LOADING';
export function toggleFoldersLoading(show) {
  return {
    type: TOGGLE_FOLDERS_LOADING,
    payload: { show },
  };
}

export const SET_ACTIVE_FOLDER = 'SET_ACTIVE_FOLDER';
export function setActiveFolder(folder) {
  return {
    type: SET_ACTIVE_FOLDER,
    payload: { folder },
  };
}

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const CREATE_FOLDER_SUCCEEDED = 'CREATE_FOLDER_SUCCEEDED';
export function createFolder(folder) {
  return {
    type: CREATE_FOLDER,
    payload: { folder },
  };
}

export const DELETE_FOLDER = 'DELETE_FOLDER';
export const DELETE_FOLDER_SUCCEEDED = 'DELETE_FOLDER_SUCCEEDED';
export function deleteFolder(folderId) {
  return {
    type: DELETE_FOLDER,
    payload: { folderId },
  };
}

export const UPDATE_FOLDER = 'UPDATE_FOLDER';
export const UPDATE_FOLDER_SUCCEEDED = 'UPDATE_FOLDER_SUCCEEDED';
export function updateFolder(folder) {
  return {
    type: UPDATE_FOLDER,
    payload: { folder },
  };
}
