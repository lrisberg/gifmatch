import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  onSelectGif(gif, key) {
    if (this.props.state.waiting) {
      return;
    }

    //shows the Gif (whether match or not)
    const visibility = { ...this.props.state.tileVisibility, [key]: true };
    this.props.store.dispatch({ type: 'SET_TILE_VISIBILITY', visibility });

    //if no currentGif, sets currentGif/Key
    if (this.props.state.currentGif === null) {
      this.props.store.dispatch({ type: 'SET_CURRENT_KEY', key });
      this.props.store.dispatch({ type: 'SET_CURRENT_GIF', gif });
    }

    //if there already is a currentGif
    else {
      //if it's not a match
      if (gif !== this.props.state.currentGif) {
        const currentKey = this.props.state.currentKey;
        // this.props.store.dispatch(addMiss());
        this.props.store.dispatch({ type: 'ADD_MISS' });
        this.props.store.dispatch({ type: 'SET_WAITING', waiting: true })
        setTimeout(() => {
          visibility[key] = false;
          visibility[currentKey] = false;
          this.props.store.dispatch({ type: 'SET_WAITING', waiting: false })
          this.props.store.dispatch({ type: 'SET_TILE_VISIBILITY', visibility });
        }, 500)
      }
      //whether it's a match or not - reset currentKey/Gif
      this.props.store.dispatch({ type: 'SET_CURRENT_KEY', key: null });
      this.props.store.dispatch({ type: 'SET_CURRENT_GIF', gif: null });
    }
  }

  renderTile(row, column, gif) {
    const key = `${row}, ${column}`;
    const visible = this.props.state.tileVisibility[key] || false;

    return <Tile selectGif={() => this.onSelectGif(gif, key)} visible={visible} gif={gif} key={key} />;
  }

  renderRow(row, tiles) {
    return (
      <div key={row} className="board-row">
        {tiles}
      </div>
    )
  }

  renderGrid(gifs) {
    return gifs.map((row, i) => {
      const tiles = gifs[i].map((tile, j) => {
        return this.renderTile(i, j, tile)
      })
      return this.renderRow(i, tiles)
    })
  }

  renderMissCounter() {
    return (
      <div className="miss-counter">
        Misses: {this.props.state.misses}
      </div>
    )
  }

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
}

  export default Board;
