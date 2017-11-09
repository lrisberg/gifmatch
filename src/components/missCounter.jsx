import React from 'react';

class MissCounter extends React.Component {
  render() {
    return (
      <div className="miss-counter">
        Misses: {this.props.misses}
      </div>
    )
  }
}

export default MissCounter;
