import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from '../helpers/componentHelpers';
import { bindActionCreators } from 'redux';
import Navbar from '../Navbar.js';
import { addShop } from '~/src/actions/shops';
import MyShopsFetchShops from '~/src/components/MyShopsFetchShops';
import MyShopsAddShop from '~/src/components/MyShopsAddShop';

class MyShops extends Component {
  render() {
    return (
      <div>
          <Navbar> </Navbar>
          <div>
              <h1> Welcome!</h1>
              <br></br>
              <div>
                  <MyShopsAddShop> </MyShopsAddShop>
                  <MyShopsFetchShops> </MyShopsFetchShops>
              </div>
          </div>
      </div>
    );
  }
}

export default MyShops;
