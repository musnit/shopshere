import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchShops } from '~/src/actions/shops';
import { fetchCategories } from '~/src/actions/categories';
import fetch from '~/src/components/fetch';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MyShopsAddShop from '~/src/components/MyShopsAddShop';
import CategoryLink from '~/src/components/categories/CategoryLink';
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
    let categoriedShops = {};
    this.props.shops.forEach((shop) => {
      let category = categoriedShops[shop.category];
      if (!category) {
        categoriedShops[shop.category] = [];
        category = categoriedShops[shop.category];
      }
      category.push(shop);
    });
    let categoriedShopsArray = [];
    for (let categoryID in categoriedShops) {
      let thisCategory = this.props.categories.filter((category) => {
        return category.id === categoryID;
      })[0];
      categoriedShopsArray.push({ category: thisCategory && thisCategory.text, shops: categoriedShops[categoryID] });
    }
    return (
      <div className="parent-of-list">
        <h2>Store List</h2>
        <Nav className="shop-list" activeKey={ this.state.activeTab } >

          { categoriedShopsArray.map((categoriedShops) => {
            return <div>
              <LinkContainer className='category-text' key={ categoriedShops.category } to={ { pathname: `#` } }>
                      <NavItem eventKey={ categoriedShops.category } key={ categoriedShops.category } >
                        { categoriedShops.category }
                      </NavItem>
                    </LinkContainer>
                    { categoriedShops.shops.map((shop, index) => <LinkContainer key={ index } to={ { pathname: `/shops/${shop.name}` } }>
                                                              <NavItem eventKey={ index } key={ index } onClick={ this.clickHandler.bind(this, index) }>
                                                                { shop.name }
                                                              </NavItem>
                                                            </LinkContainer>
                      ) }
                    </div>
          })}
        </Nav>
        <MyShopsAddShop categories={ this.props.categories } />
      </div>
      );
  }
}

const FetchedShopList = fetch(ShopList, {
  actions: [fetchShops, fetchCategories]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  return {
    categories,
    shops
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShops: bindActionCreators(fetchShops, dispatch),
    fetchCategories: bindActionCreators(fetchCategories, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedShopList);
