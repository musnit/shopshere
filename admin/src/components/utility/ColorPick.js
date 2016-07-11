import React, { Component, PropTypes } from 'react';
import { ChromePicker } from 'react-color'

class ColorPick extends Component {


  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
    };
  }

  handleClick() {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  };

  handleClose() {
    this.setState({
      displayColorPicker: false
    })
    this.props.onClosing(this.props.index);
  };

  handleChangeComplete(color) {
    this.props.handleChange(color, this.props.index);
  }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    }
    const styledbutton = {
      borderRadius: '6px',
      color: '#fff',
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
      padding: '8px 10px',
    }
    return (
      <div>
        <button style={ styledbutton } onClick={ this.handleClick.bind(this) }>Pick a Color</button>
        { this.state.displayColorPicker ? <div style={ popover }>
                                            <div style={ cover } onClick={ this.handleClose.bind(this) } />
                                            <ChromePicker onChangeComplete={ this.handleChangeComplete.bind(this) } />
                                          </div> : null }
      </div>
    )
  }
}

export default ColorPick