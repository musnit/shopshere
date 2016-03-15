import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from '../helpers/componentHelpers';
import { bindActionCreators } from 'redux';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';

class MyShopsFetchShops extends Component {
  render() {
    return (
      <div className="container">
          <br></br>
          <h2> List of your Shops: </h2>
          <div>
              {this.props.shops.map((shop, index) => 
              <div key={shop.key}>
                  Shop {index}: <Link to={`/myshops/${shop.name}`}> {shop.name} </Link>
              </div>
              )}
          </div>
          <br></br>
      </div>
    );
  }
}
const FetchedShops = fetch(MyShopsFetchShops, {
  actions: [fetchShops]
});


function mapStateToProps(state) {
  const shops = state.shops;
  return { shops };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchShops: bindActionCreators(fetchShops, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedShops);

