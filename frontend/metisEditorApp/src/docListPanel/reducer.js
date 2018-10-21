import update from 'immutability-helper';
import { combineReducers } from 'redux';
import {
  GET_DOCUMENT_LIST_SUCCEEDED,
  GET_DOCUMENT_SUCCEEDED,
  CREATE_DOCUMENT_SUCCEEDED,
  TOGGLE_DOCUMENT_LIST_LOADING,
  DELETE_DOCUMENT_SUCCEEDED,
} from './actions';

function editorReducer(state = {}, action) {
  switch (action.type) {
    case GET_DOCUMENT_LIST_SUCCEEDED:
      return update(state, {
        documentList: {
          $set: action.payload.documentList,
        },
      });
    case GET_DOCUMENT_SUCCEEDED:
      return update(state, {
        currentDocument: {
          $set: action.payload.currentDocument,
        },
      });
    case CREATE_DOCUMENT_SUCCEEDED:
      return update(state, {
        currentDocument: {
          $set: action.payload.currentDocument,
        },
        documentList: {
          $unshift: [action.payload.currentDocument],
        },
      });
    case DELETE_DOCUMENT_SUCCEEDED: {
      const { id } = action.payload;
      const index = state.documentList.findIndex(item => item.id === id);

      if (state.currentDocument && state.currentDocument.id === id) {
        return update(state, {
          currentDocument: {
            $set: null,
          },
          documentList: {
            $splice: [[index, 1]],
          },
        });
      }

      return update(state, {
        documentList: {
          $splice: [[index, 1]],
        },
      });
    }
    default:
      return state;
  }
}

function editorStateReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_DOCUMENT_LIST_LOADING:
      return update(state, {
        isDocumentListLoading: {
          $set: action.payload.show,
        },
      });
    default:
      return state;
  }
}

export default combineReducers({
  editor: editorReducer,
  editorState: editorStateReducer,
});
