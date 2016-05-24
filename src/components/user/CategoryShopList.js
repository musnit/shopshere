import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import ShopCarousel from '~/src/components/user/ShopCarousel'
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { find, sortBy, forEach } from 'lodash';

class CategoryShopList extends Component {

  constructor(props) {
    super(props);
  }

  render() {

  	var categoryName = this.props.params.category;

  	var currentCategory = _.find(this.props.categories, function(o){
  		return o.name == categoryName;
  	});

  	var shopsInCategory = _.filter(this.props.shops, function(o){
  		return o.category == currentCategory.name;
  	});

    return (
      <div>
        {shopsInCategory.map((shop, index) =>
              <ShopCarousel data={[shop,index]} />
          )}
      </div>
    );
  }
}

const FetchedCatShops = fetch(CategoryShopList, {
  actions: [fetchCategories, fetchShops]
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
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedCatShops);