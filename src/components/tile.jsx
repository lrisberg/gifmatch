import React from 'react';

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

export default Tile;
