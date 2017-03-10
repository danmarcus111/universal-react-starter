import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

let store;
if (window.__PRELOADED_STATE__) {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = JSON.parse(window.__PRELOADED_STATE__);

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;
  console.log(preloadedState);
  store = createStore(reducers, preloadedState);
  console.log(store.getState());
} else {
  store = createStore(reducers);
}

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>,
  document.getElementById('root')
);