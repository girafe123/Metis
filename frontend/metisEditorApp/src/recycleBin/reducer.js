import update from 'immutability-helper';
import { combineReducers } from 'redux';
import {
  QUERY_RECYLE_BIN_SUCCEEDED,
  TOGGLE_RECYCLE_LOADING,
} from './actions';

function editorReducer(state = {}, action) {
  switch (action.type) {
    case QUERY_RECYLE_BIN_SUCCEEDED:
      return update(state, {
        recycleBin: {
          documents: {
            $set: action.payload.documents,
          },
          folders: {
            $set: action.payload.folders,
          },
        },
      });
    default:
      return state;
  }
}

function editorStateReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_RECYCLE_LOADING:
      return update(state, {
        isRecycleBinLoading: {
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
