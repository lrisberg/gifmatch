import React from 'react';
import { setBoardSize } from '../actions/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

class SizeSelector extends React.Component {

  render() {
    return (
      <div>
        Choose Size:
        <select onChange={this.onSetBoardSize}>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </div>
    )
  }

  onSetBoardSize = (event) => {
    if (event.target.value === 'medium') {
      this.props.setBoardSize(getGifs('medium'))
    }
    else if (event.target.value === 'small') {
      this.props.setBoardSize(getGifs('small'));
    }
  }
}

function getGifs(boardSize) {
  let sourceGifs;
  if (boardSize === 'medium') {
    sourceGifs = [
      'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
      'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
      'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
      'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
      'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
      'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif',
      'https://media.giphy.com/media/l3q2L3yM5UhxEnsvC/giphy.gif',
      'https://media.giphy.com/media/3oz8xDzuVDbKoU4shi/giphy.gif'
    ];
  }
  else if (boardSize === 'small') {
    sourceGifs = [
      'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
      'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
      'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
      'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
      'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
      'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif'
    ];
  }
  let doubledGifs = _.concat(sourceGifs, sourceGifs)
  let shuffledGifs = _.shuffle(doubledGifs);
  let groupedGifs = _.chunk(shuffledGifs, 4);
  return groupedGifs;
}

function mapStateToProps(state, ownProps) {
  return {
    gifs: state.gifs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setBoardSize: setBoardSize
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector);
