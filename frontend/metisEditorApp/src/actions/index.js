export const SWITCH_MODE = 'SWITCH_MODE';
export const UPDATE_DOC_TITLE = 'UPDATE_DOC_TITLE';
export const UPDATE_DOC_CONTENT = 'UPDATE_DOC_CONTENT';
export const SET_ACTIVE_DOC = 'SET_ACTIVE_DOC';

export function switchMode(mode) {
  return { type: SWITCH_MODE, payload: {
    mode
  }};
}

export function updateDocContent(content) {
  return { type: UPDATE_DOC_CONTENT, payload: {
    content
  }};
}

export function updateDocTitle(title) {
  return { type: UPDATE_DOC_TITLE, payload: {
    title
  }};
}


export function setActiveDoc(docId) {
  return { type: SET_ACTIVE_DOC, payload: {
    docId
  }};
}