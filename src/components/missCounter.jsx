import React from 'react';
import { connect } from 'react-redux';

class MissCounter extends React.Component {
  render() {
    return (
      <div className="miss-counter">
        Misses: {this.props.misses}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    misses: state.misses
  }
}

export default connect(mapStateToProps)(MissCounter);
