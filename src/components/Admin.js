import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MyShopsDeleteShop from '~/src/components/MyShopsDeleteShop';
import MyShopsEditShop from '~/src/components/MyShopsEditShop';


class Admin extends Component {
  render() {
    return (
        <div>
			<h3> Shop Admin: </h3>
			<MyShopsEditShop data={this.props.data} />
			<MyShopsDeleteShop data={this.props.data} />
        </div>
    );
  }
}

export default Admin;
