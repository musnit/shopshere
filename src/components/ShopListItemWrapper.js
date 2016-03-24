import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



class ShopListItemWrapper extends Component {
  render() {
    return (
      <li>
        <Link to={`/myshops/${this.props.data.name}`}> {this.props.data.name} </Link>
      </li>
    );
  }
}

export default ShopListItemWrapper;
