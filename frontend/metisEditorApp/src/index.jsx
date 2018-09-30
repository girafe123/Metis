import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import rootReducer from './reducers';

let store = createStore(rootReducer,
  {
    mode: 'edit',
    folders: [{
      id: 1,
      name: 'folder 1',
      children: [{
        id: 11,
        name: 'folder 11',
        children: [{
          id: 111,
          name: 'folder 111',
          children: []
        },{
          id: 112,
          name: 'folder 112',
          children: []
        },{
          id: 113,
          name: 'folder 113',
          children: []
        }]
      },{
        id: 12,
        name: 'folder 12',
        children: []
      },{
        id: 13,
        name: 'folder 13',
        children: []
      }]
    },{
      id: 2,
      name: 'folder 2',
      children: []
    },{
      id: 3,
      name: 'folder 3',
      children: []
    }],
    docList: [{
      id: 1,
      title: 'xxxx1',
      content: '# 333333',
      type: 'md',
    },{
      id: 2,
      title: 'xxxx2',
      content: '# 333333',
      type: 'md',
    }],
    currentDoc: {
      id: 1,
      title: 'xxxx1',
      content: '# 333333',
      type: 'md',
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));