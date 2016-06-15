import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ShopList from '~/src/components/ShopList';
import '~/src/styles/shops.css';

class Shops extends Component {
  render() {
    return (
      <div className='container shops-page'>
        <div className='row'>
          <div className="column container-header">Shops</div>
        </div>
        <div className="row shops-section">
          <ShopList />
          <div className="shop-details">
            { this.props.children }
          </div>
        </div>
      </div>
      );
  }
}

export default Shops;