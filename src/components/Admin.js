import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MyShopsDeleteShop from '~/src/components/MyShopsDeleteShop';
import MyShopsEditShop from '~/src/components/MyShopsEditShop';
import CheckInvisibleShop from '~/src/components/CheckInvisibleShop';


class Admin extends Component {
  render() {
    return (
      <div>
        <h3> Shop Admin: </h3>
        <MyShopsEditShop shopID={ this.props.shopID } />
        <MyShopsDeleteShop shopID={ this.props.shopID } />
        <CheckInvisibleShop shopID={ this.props.shopID } />
      </div>
      );
  }
}

export default Admin;
