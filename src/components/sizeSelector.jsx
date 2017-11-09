import React from 'react';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  render() {
    return (
      <div>
        Choose Size:
        <select onChange={this.onChange}>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </div>
    )
  }

  onChange = (event) => {
    console.log('changed', event.target.value);
    this.setState({value: event.target.value})
  }

}

export default SizeSelector;
