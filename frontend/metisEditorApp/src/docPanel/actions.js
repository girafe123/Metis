export const SWITCH_MODE = 'SWITCH_MODE';
export function switchMode(mode) {
  return {
    type: SWITCH_MODE,
    payload: {
      mode,
    },
  };
}

export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const UPDATE_DOCUMENT_SUCCEEDED = 'UPDATE_DOCUMENT_SUCCEEDED';
export function updateDocument(doc) {
  return {
    type: UPDATE_DOCUMENT,
    payload: {
      doc,
    },
  };
}

export const TOGGLE_DOCUMENT_LOADING = 'TOGGLE_DOCUMENT_LOADING';
export function toggleDocumentLoading(show) {
  return {
    type: TOGGLE_DOCUMENT_LOADING,
    payload: {
      show,
    },
  };
}

export const TOGGLE_DOCUMENT_SAVING = 'TOGGLE_DOCUMENT_SAVING';
export function toggleDocumentSaving(show) {
  return {
    type: TOGGLE_DOCUMENT_SAVING,
    payload: {
      show,
    },
  };
}
