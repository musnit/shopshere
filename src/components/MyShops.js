import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from '../helpers/componentHelpers';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import Navbar from '../Navbar.js';
import { addShop } from '~/src/actions/shops';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import MyShopsFetchShops from '~/src/components/MyShopsFetchShops';

class MyShops extends Component {

  addShop() {
    this.props.addShop({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue()
    });
    this.refs.nameBox.value = '';
    this.refs.keyBox.value = '';
  }

  render() {


    const {
      users,
      shops,
      views
    } = this.props;

    const user = getUser(
    users);

    const myShops = getMyShops(
      users,
      shops
    );

    return (
<div>
      <Navbar> </Navbar>

	<div>
       <h1> Welcome!</h1>


<br></br>

      <div>

      <MyShopsFetchShops> </MyShopsFetchShops>


       <h2> Add a new shop: </h2>

      <label for="inputShopName" class="sr-only">Shop Name</label>

      <Input type="ShopName" ref='nameBox' placeholder="Shop Name..." required />


      <label for="inputShopKey" class="sr-only">Shop Key</label>
      <Input type="ShopKey" ref='keyBox' placeholder="Shop Key..." />

      <ButtonInput type="submit" bsStyle="primary" bsSize="large"  onClick = {this.addShop.bind(this)} >Add a shop</ButtonInput>

      <h2> List of your shops: </h2>
      <ul>
      {myShops.map(shop =>
          <li>
        {shop.name}
      </li>

    )}

        </ul>


      </div>
         </div>
         </div>
    );
  }
}

const FetchedShops = fetch(MyShops, {
  actions: [fetchShops]
});


function mapStateToProps(state) {
  const users = state.users;
  const shops = state.shops;
  const views = state.views;
  return {
    users,
    shops,
    views
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addShop: bindActionCreators(addShop, dispatch),
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(FetchedShops);
