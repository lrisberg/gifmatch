import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  toggleTile() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    let contents;
    if (this.state.visible) {
      contents = (
        <img onClick={() => this.toggleTile()} src={this.props.gif} alt="a fruit" className="hidden-tile">
        </img>
      )
    }
    else {
      contents = (
        <div onClick={() => this.toggleTile()} src={this.props.gif} alt="a fruit" className="hidden-tile">
        </div>
      )
    }

    return (
      contents
    );
  }
}

class Board extends React.Component {

  renderTile(row, column, gif) {
    let key = `${row}, ${column}`;
    return <Tile visible={false} gif={gif} key={key} />;
  }

  renderRow(row, tiles) {
    return (
      <div key={row} className="board-row">
        {tiles}
      </div>
    )
  }

  renderGrid(gifs) {
    let rows = [];
    for (let i = 0; i < gifs.length; i++) {
      let tiles = [];
      for (let j = 0; j < gifs[i].length; j++) {
        tiles.push(this.renderTile(i, j, gifs[i][j]))
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
          {this.renderGrid(this.props.gifs)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [
        [
          'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
          'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
          'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
          'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif'
        ],
        [
          'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
          'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif',
          'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
          'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif'
        ],
        [
          'https://media.giphy.com/media/l3q2L3yM5UhxEnsvC/giphy.gif',
          'https://media.giphy.com/media/3oz8xDzuVDbKoU4shi/giphy.gif',
          'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
          'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif'
        ],
        [
          'https://media.giphy.com/media/l3q2L3yM5UhxEnsvC/giphy.gif',
          'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
          'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif',
          'https://media.giphy.com/media/3oz8xDzuVDbKoU4shi/giphy.gif'
        ]
      ]
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
