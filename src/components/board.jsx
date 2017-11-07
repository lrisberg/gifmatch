import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      tileVisibility: {
      }
    }
  }

  onSelectGif(gif, key) {
    if (this.props.state.waiting) {
      return;
    }
    const visibility = this.state.tileVisibility;
    visibility[key] = true;
    this.setState({tileVisibility: visibility});

    if (this.props.state.currentGif === null) {
      this.setState({
        currentKey: key
      })
      this.props.store.dispatch({ type: 'SET_CURRENT_GIF', gif });
    }
    else {
      if (gif === this.props.state.currentGif) {
        console.log('match!')
      }
      else {
        console.log('not a match');
        const currentKey = this.state.currentKey;
        this.props.store.dispatch({ type: 'ADD_MISS' });
        this.props.store.dispatch({ type: 'SET_WAITING', waiting: true })
        setTimeout(() => {
          visibility[key] = false;
          visibility[currentKey] = false;
          this.props.store.dispatch({ type: 'SET_WAITING', waiting: false })
          this.setState({
            tileVisibility: visibility
          })
        }, 500)
      }
      this.setState({
        currentKey: null
      })
      this.props.store.dispatch({ type: 'SET_CURRENT_GIF', gif: null });
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
