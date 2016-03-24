import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from '../helpers/componentHelpers';
import { bindActionCreators } from 'redux';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import ListItemWrapper from '~/src/components/ListItemWrapper';

class MyShopsFetchShops extends Component {
  render() {
    return (
      <div className="container">
          <br></br>
          <h2> List of your Shops: </h2>
          <div>
            <ul>
              {this.props.shops.map((shop, index) => 
                <ListItemWrapper key={index} data={shop}/>
              )}
            </ul>
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

