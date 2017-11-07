import React from 'react';
import Tile from './tile';

import {
  addMiss,
  setCurrentGif,
  setCurrentKey,
  setTileVisibility,
  setWaiting
} from '../actions/actions.js';

class Board extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.renderGrid(this.props.state.gifs)}
        </div>
        {this.renderMissCounter()}
      </div>
    );
  }

  onSelectGif = (gif, key) => {
    if (this.props.state.waiting) {
      return;
    }

    const visibility = { ...this.props.state.tileVisibility, [key]: true };
    this.props.store.dispatch(setTileVisibility(visibility));

    if (this.props.state.currentGif === null) {
      this.props.store.dispatch(setCurrentKey(key));
      this.props.store.dispatch(setCurrentGif(gif));
    }
    else {
      if (gif !== this.props.state.currentGif) {
        const currentKey = this.props.state.currentKey;
        this.props.store.dispatch(addMiss());
        this.props.store.dispatch(setWaiting(true));
        setTimeout(() => {
          visibility[key] = false;
          visibility[currentKey] = false;
          this.props.store.dispatch(setWaiting(false));
          this.props.store.dispatch(setTileVisibility(visibility));
        }, 500)
      }
      this.props.store.dispatch(setCurrentKey(null));
      this.props.store.dispatch(setCurrentGif(null));
    }
  }

  renderMissCounter = () => {
    return (
      <div className="miss-counter">
        Misses: {this.props.state.misses}
      </div>
    )
  }

  renderGrid = (gifs) => {
    return gifs.map((row, i) => {
      const tiles = gifs[i].map((tile, j) => {
        return this.renderTile(i, j, tile)
      })
      return this.renderRow(i, tiles)
    })
  }

  renderTile = (row, column, gif) => {
    const key = `${row}, ${column}`;
    const visible = this.props.state.tileVisibility[key] || false;

    return <Tile selectGif={() => this.onSelectGif(gif, key)} visible={visible} gif={gif} key={key} />;
  }

  renderRow = (row, tiles) => {
    return (
      <div key={row} className="board-row">
        {tiles}
      </div>
    )
  }
}

  export default Board;
