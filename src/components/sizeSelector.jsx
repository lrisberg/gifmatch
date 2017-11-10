import React from 'react';
import { startNewGame } from '../actions/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    this.props.startNewGame(event.target.value);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    gifs: state.gifs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startNewGame: startNewGame
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector);
