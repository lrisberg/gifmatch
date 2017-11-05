import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';

class Tile extends React.Component {
  toggleTile() {
    if (!this.props.visible) {
      this.props.selectGif(this.props.gif);
    }
  }

  render() {
    let contents;
    if (this.props.visible) {
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
  constructor(props) {
    super(props);
    this.state = {
      misses: 0,
      currentGif: null,
      waiting: false,
      tileVisibility: {
      }
    }
  }

  onSelectGif(gif, key) {
    if (this.state.waiting) {
      return;
    }
    const visibility = this.state.tileVisibility;
    visibility[key] = true;
    this.setState({tileVisibility: visibility});

    if (this.state.currentGif === null) {
      this.setState({
        currentGif: gif,
        currentKey: key
      })
    }
    else {
      if (gif === this.state.currentGif) {
        console.log('match!')
      }
      else {
        console.log('not a match');
        const currentKey = this.state.currentKey;
        this.setState({
          waiting: true,
          misses: this.state.misses + 1
        })
        setTimeout(() => {
          visibility[key] = false;
          visibility[currentKey] = false;
          this.setState({
            tileVisibility: visibility,
            waiting: false
          })
        }, 500)
      }
      this.setState({
        currentGif: null,
        currentKey: null
      })
    }
  }

  renderTile(row, column, gif) {
    let key = `${row}, ${column}`;
    const visible = this.state.tileVisibility[key] || false;

    return <Tile selectGif={(gif) => this.onSelectGif(gif, key)} visible={visible} gif={gif} key={key} />;
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

  renderMissCounter() {
    return (
      <div className="miss-counter">
        Misses: {this.state.misses}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          {this.renderGrid(this.props.gifs)}
        </div>
        {this.renderMissCounter()}
      </div>
    );
  }
}

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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
