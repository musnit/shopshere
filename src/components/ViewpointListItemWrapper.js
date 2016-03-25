import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



class ViewpointListItemWrapper extends Component {
  render() {
    return (
      <li> {this.props.data.name} </li>
    );
  }
}

export default ViewpointListItemWrapper;
