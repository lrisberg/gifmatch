import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tile extends React.Component {
  render() {
    return (
      <button className="tile">
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 5,
      length: 4
    }
  }

  renderTile(row, column) {
    const key = `${row}, ${column}`
    return <Tile key={key} />;
  }

  renderRow(row, tiles) {
    return (
      <div key={row} className="board-row">
        {tiles}
      </div>
    )
  }

  renderGrid(length, height) {
    let rows = [];
    for (let i = 0; i < height; i++) {
      let tiles = [];
      for (let j = 0; j < length; j++) {
        tiles.push(this.renderTile(i, j));
      }
      const row = this.renderRow(i, tiles);
      rows.push(row);
    }
    return rows;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderGrid(this.state.length, this.state.height)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
