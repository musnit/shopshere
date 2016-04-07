import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MyShopsAddShop from '~/src/components/MyShopsAddShop';
import '~/src/styles/shops.css';

class ShopList extends Component {


  constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };
    }

    clickHandler(param) {
        this.setState({
            activeTab: param
        });

    }


  render() {
    return (
      <div className="parent-of-list">
        <Nav className="shop-list" activeKey={this.state.activeTab} bsStyle="pills" stacked={true}>
          {this.props.shops.map((shop, index) =>
            <LinkContainer key={index} to={{ pathname: `/shops/${shop.name}` }}>
              <NavItem eventKey={index} key={index} onClick={this.clickHandler.bind(this, index)} >{shop.name}</NavItem>
            </LinkContainer>
          )}
        </Nav>
        <MyShopsAddShop />
      </div>
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
