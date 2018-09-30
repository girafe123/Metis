import { combineReducers } from 'redux'
import { SWITCH_MODE, UPDATE_DOC_CONTENT, UPDATE_DOC_TITLE, SET_ACTIVE_DOC } from '../actions';

export default function rootReducer(state, action) {
  switch (action.type) {
    case SWITCH_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case UPDATE_DOC_TITLE:
      return {
        ...state,
        currentDoc: {
          ...state.currentDoc,
          title: action.payload.title
        },
      }
    case UPDATE_DOC_CONTENT:
      return {
        ...state,
        currentDoc: {
          ...state.currentDoc,
          content: action.payload.content
        },
      }
    case SET_ACTIVE_DOC:
      return {
        ...state,
        currentDocId: action.payload.docId,
      }
    default:
      return state
  }
}