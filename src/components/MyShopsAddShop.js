import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import { unboundAddshop } from '~/src/actions/shops';
import MyShopsFetchShops from '~/src/components/MyShopsFetchShops';

class MyShopsAddShop extends Component {

  clickedAddShop() {
    this.props.boundAddShop({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue()
    });
    this.refs.nameBox.value = '';
    this.refs.keyBox.value = '';
  }

  render() {
    return (
      <div className="container">
          <br></br>
          <h2> Add a new shop: </h2>
          <label htmlFor="inputShopName" className="sr-only">Shop Name</label>
          <Input type="ShopName" ref='nameBox' placeholder="Shop Name..." required />
          <label htmlFor="inputShopKey" className="sr-only">Shop Key</label>
          <Input type="ShopKey" ref='keyBox' placeholder="Shop Key..." />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large"  onClick = {this.clickedAddShop.bind(this)} >Add a shop</ButtonInput>
          <br></br>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = state.shops;
  return {
    shops
  };
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddShop: bindActionCreators(unboundAddShop, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyShopsAddShop);
