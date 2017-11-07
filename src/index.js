import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';

import Game from './components/game';
import game from './reducers/game';

const store = createStore(game);
const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  <Game
    state={store.getState()}
    store={store}
  />,
  rootEl
);

render();
store.subscribe(render);


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
