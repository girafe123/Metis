import update from 'immutability-helper';
import { combineReducers } from 'redux';

import {
  TOGGLE_DOCUMENT_LOADING,
  TOGGLE_DOCUMENT_SAVING,
  SWITCH_MODE,
  UPDATE_DOCUMENT_SUCCEEDED,
} from './actions';

function editorReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_DOCUMENT_SUCCEEDED: {
      const { doc } = action.payload;
      const index = state.documentList.findIndex(item => item.id === doc.id);
      return update(state, {
        documentList: {
          [index]: {
            $set: doc,
          },
        },
      });
    }
    default:
      return state;
  }
}

function editorStateReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_DOCUMENT_LOADING:
      return update(state, {
        isCurrentDocmentLoading: {
          $set: action.payload.show,
        },
      });
    case TOGGLE_DOCUMENT_SAVING:
      return update(state, {
        isCurrentDocumentSaving: {
          $set: action.payload.show,
        },
      });
    case SWITCH_MODE:
      return update(state, {
        mode: {
          $set: action.payload.mode,
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
