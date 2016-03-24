import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



class ListItemWrapper extends Component {
  render() {
    return (
      <li>
        <Link to={`/myshops/${this.props.data.name}`}> {this.props.data.name} </Link>
      </li>
    );
  }
}

export default ListItemWrapper;
