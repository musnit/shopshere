import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ShopList extends Component {
  render() {
    return (
      <Nav className="shop-list" bsStyle="pills" stacked={true}>
        {this.props.shops.map((shop, index) =>
          <LinkContainer key={index} to={{ pathname: `/shops/${shop.name}` }}>
            <NavItem>{shop.name}</NavItem>
          </LinkContainer>
        )}
  	  </Nav>
    );
  }
}
const FetchedShopList = fetch(ShopList, {
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchedShopList);
