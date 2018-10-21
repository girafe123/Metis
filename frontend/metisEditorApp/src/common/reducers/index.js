import update from 'immutability-helper';
import {
  SHOW_MESSAGE,
  HIDE_MESSAGE,
} from '../actions';

import { reducer as docListPanelReducer } from '../../docListPanel';
import { reducer as docPanelReducer } from '../../docPanel';
import { reducer as folderPanelReducer } from '../../folderPanel';

function commonReducer(state = {}, action) {
  switch (action.type) {
    case SHOW_MESSAGE: {
      const { text, type } = action.payload;
      return update(state, {
        editorState: {
          message: {
            $set: {
              text,
              type,
              show: true,
            },
          },
        },
      });
    }
    case HIDE_MESSAGE:
      return update(state, {
        editorState: {
          message: {
            show: {
              $set: false,
            },
          },
        },
      });
    default:
      return state;
  }
}

export default function rootReducer(state = {}, action) {
  let newState = commonReducer(state, action);
  newState = docListPanelReducer(newState, action);
  newState = docPanelReducer(newState, action);
  newState = folderPanelReducer(newState, action);
  return newState;
}
