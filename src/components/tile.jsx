import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGif } from '../actions/actions';

class Tile extends React.Component {
  static propTypes = {
    gif: PropTypes.string.isRequired,
    selectGif: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  }

  render() {
    if (this.props.visible) {
      return (
        <img
          onClick={this.toggleTile}
          src={this.props.gif}
          alt="a fruit"
          className="hidden-tile" />
      )
    }
    else {
      return (
        <div
          onClick={this.toggleTile}
          src={this.props.gif}
          alt="a fruit"
          className="hidden-tile" />
      )
    }
  }

  toggleTile = () => {
    if (!this.props.visible) {
      this.props.selectGif(this.props.gifkey, this.props.gif);
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectGif: (key, gif) => {
      dispatch(selectGif(key, gif));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
