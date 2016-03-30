import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MyShopsFetchShops from '~/src/components/MyShopsFetchShops';
import MyShopsAddShop from '~/src/components/MyShopsAddShop';
import '~/src/styles/shops.css';

class MyShops extends Component {
  render() {
    return (
      <div className='container shops-page'>
        <div className='row'>
          <div className="column container-header">Shops</div>
        </div>
        <div className="row shops-section">
          <MyShopsFetchShops/ >
          <div className="shop-details">
            {this.props.children}
          </div>
          <MyShopsAddShop />
        </div>
      </div>
    );
  }
}

export default MyShops;
