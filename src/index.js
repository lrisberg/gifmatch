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
  renderTile() {
    return <Tile />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderTile()}
          {this.renderTile()}
          {this.renderTile()}
        </div>
        <div className="board-row">
          {this.renderTile()}
          {this.renderTile()}
          {this.renderTile()}
        </div>
        <div className="board-row">
          {this.renderTile()}
          {this.renderTile()}
          {this.renderTile()}
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
