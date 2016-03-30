import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MyProductsFetchProducts from '~/src/components/MyProductsFetchProducts';
import MyProductsAddProduct from '~/src/components/MyProductsAddProduct';

class Products extends Component {
  render() {
    return (
        <div>
          <MyProductsFetchProducts data={this.props.data}> </MyProductsFetchProducts>
          <MyProductsAddProduct data={this.props.data}> </MyProductsAddProduct>
        </div>
    );
  }
}

export default Products;
