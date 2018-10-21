import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import '@babel/polyfill';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import rootReducer from './common/reducers';
import saga from './common/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  {
    editor: {
      folderList: [],
      documentList: [],
      currentFolder: null,
      currentDocument: null,
    },
    editorState: {
      mode: 'edit',
      isFolderListLoading: false,
      isDocumentListLoading: false,
      isCurrentDocmentLoading: false,
      isCurrentDocumentSaving: false,
      message: {
        text: '',
        type: 'info',
        show: false,
      },
    },
  },
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  ));

sagaMiddleware.run(saga);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
