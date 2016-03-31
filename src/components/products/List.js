import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts } from '~/src/actions/products';


class List extends Component {

  componentWillUnmount() {
    this.props.clearProducts();
  }

  render() {

    return (
      <div>
          <label>Select a product to view/edit:</label>
          <select>
              {this.props.products.map((product, index) =>
              <option key={index}> {product.name} </option>
              )}
          </select>
      </div>
    );
  }
}

const FetchedList = fetch(List, {
  actions: [fetchProducts]
});


function mapStateToProps(state) {
  const products = state.products;
  return { products };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch),
    clearProducts: bindActionCreators(clearProducts, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedList);