import React from 'react';
import _ from 'lodash';
import Board from './board.jsx';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board state={this.props.state} store={this.props.store}/>
        </div>
      </div>
    );
  }
}

export default Game;
