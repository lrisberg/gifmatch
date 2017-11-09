import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import { Provider } from 'react-redux';

import Game from './components/game';
import game from './reducers/game';

const store = createStore(
  game,
  applyMiddleware(thunk)
);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Game></Game>
  </Provider>,
  rootEl
);
