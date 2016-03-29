import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MyProductsFetchProducts from '~/src/components/MyProductsFetchProducts';
import MyProductsAddProduct from '~/src/components/MyProductsAddProduct';

class MyProducts extends Component {
  render() {
    return (
        <div>
            <h1> My Shop's Products </h1>
            <br></br>
            <div>
                <MyProductsFetchProducts data={this.props.data}> </MyProductsFetchProducts>
                <MyProductsAddProduct data={this.props.data}> </MyProductsAddProduct>            
            </div>
        </div>
    );
  }
}

export default MyProducts;