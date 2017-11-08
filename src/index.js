import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import { connect, Provider } from 'react-redux';

import Game from './components/game';
import game from './reducers/game';

// render();
// store.subscribe(render);

function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game);

const store = createStore(game);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedGame></ConnectedGame>
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
