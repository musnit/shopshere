import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts } from '~/src/actions/products';


class MyProductsFetchProducts extends Component {

  componentWillUnmount() {
    this.props.clearProducts();
  }

  render() {

    return (
      <div className="container">
          <br></br>
          <h2> List of your Products: </h2>
          <div>
              {this.props.products.map((product, index) => 
                <ProductListItemWrapper key={index} data={product}/>
              )}
          </div>
          <br></br>
      </div>
    );
  }
}

const FetchedProducts = fetch(MyProductsFetchProducts, {
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchedProducts);