import update from 'immutability-helper';
import { combineReducers } from 'redux';
import {
  GET_FOLDERS_SUCCEEDED,
  CREATE_FOLDER_SUCCEEDED,
  DELETE_FOLDER_SUCCEEDED,
  UPDATE_FOLDER_SUCCEEDED,
  SET_ACTIVE_FOLDER,
  TOGGLE_FOLDERS_LOADING,
} from './actions';
import { makeNodePath, makeCommandsPush,
  makeCommandsDelete, makeCommandsUpdate, makeFolderTree } from './utils';

function editorReducer(state = {}, action) {
  switch (action.type) {
    case GET_FOLDERS_SUCCEEDED: {
      const folders = action.payload.folders.filter(item => !item.isDelete);
      return update(state, {
        folderList: {
          $set: makeFolderTree(folders),
        },
      });
    }
    case CREATE_FOLDER_SUCCEEDED: {
      const { folder } = action.payload;
      folder.children = [];
      if (!folder.parentId) {
        return update(state, {
          folderList: {
            $unshift: [folder],
          },
        });
      }
      const path = makeNodePath(state.folderList, folder.parentId);
      return update(state, {
        folderList: makeCommandsPush(path, folder),
      });
    }
    case DELETE_FOLDER_SUCCEEDED: {
      const { folderId } = action.payload;
      const path = makeNodePath(state.folderList, folderId);

      return update(state, {
        folderList: makeCommandsDelete(path),
      });
    }

    case UPDATE_FOLDER_SUCCEEDED: {
      const { folder } = action.payload;
      const path = makeNodePath(state.folderList, folder.id);
      return update(state, {
        folderList: makeCommandsUpdate(path, folder),
      });
    }
    case SET_ACTIVE_FOLDER: {
      const { folder } = action.payload;
      return update(state, {
        currentFolder: {
          $set: folder,
        },
      });
    }
    default:
      return state;
  }
}

function editorStateReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_FOLDERS_LOADING:
      return update(state, {
        isFolderListLoading: {
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
