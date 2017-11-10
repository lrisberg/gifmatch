import React from 'react';
import Tile from './tile';
import MissCounter from './missCounter';
import SizeSelector from './sizeSelector';
import { selectGif } from '../actions/actions.js';
import { connect } from 'react-redux';

class Board extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.renderGrid(this.props.gifs)}
        </div>
        {this.renderMissCounter()}
        {this.renderSizeSelector()}
      </div>
    );
  }

  renderMissCounter = () => {
    return (
      <MissCounter/>
    )
  }

  renderSizeSelector = () => {
    return (
      <SizeSelector/>
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
    const visible = this.props.tileVisibility[key] || false;

    return <Tile
      visible={visible}
      gif={gif}
      key={key}
      gifkey={key} />;
  }

  renderRow = (row, tiles) => {
    return (
      <div key={row} className="board-row">
        {tiles}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    gifs: state.gifs,
    misses: state.misses,
    tileVisibility: state.tileVisibility,
    waiting: state.waiting,
    currentGif: state.currentGif,
    currentKey: state.currentKey
  }
}

export default connect(mapStateToProps)(Board);
