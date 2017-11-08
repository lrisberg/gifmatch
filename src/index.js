import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import { connect, Provider } from 'react-redux';

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


// container


// function mapStateToProps(state, ownProps) {
//   return {
//     selected: state.tiles[ownProps.x][ownProps.y].selected
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     toggleTile: () => dispatch({ type: "UPDATE_TILE", payload: { ownProps.x, ownProps.y }})
//   }
// }
//
// connect(mapStateToProps, mapDispatchToProps)(Tile)
