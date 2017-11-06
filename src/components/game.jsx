import React from 'react';
import _ from 'lodash';
import Board from './board.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props)
    const sourceGifs = [
      'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
      'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
      'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
      'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
      'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
      'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif',
      'https://media.giphy.com/media/l3q2L3yM5UhxEnsvC/giphy.gif',
      'https://media.giphy.com/media/3oz8xDzuVDbKoU4shi/giphy.gif'
    ];
    let sourceGifsDoubled = _.concat(sourceGifs, sourceGifs)
    let shuffledGifs = _.shuffle(sourceGifsDoubled);
    let groupedGifs = _.chunk(shuffledGifs, 4);

    this.state = {
      gifs: groupedGifs
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board gifs={this.state.gifs}/>
        </div>
      </div>
    );
  }
}

export default Game;
