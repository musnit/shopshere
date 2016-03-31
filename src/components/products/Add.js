import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import { unboundAddProduct } from '~/src/actions/products';

class Add extends Component {

  clickedAddProduct() {
    this.props.boundAddProduct({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      shop: this.props.data
    });
    this.refs.nameBox.value = '';
    this.refs.keyBox.value = '';
  }

  render() {
    return (
      <div className="container">
          <br></br>
          <h2> Add a new Product: </h2>
          <label htmlFor="inputProductName" className="sr-only">Product Name</label>
          <Input type="ProductName" ref='nameBox' placeholder="Product Name..." required />
          <label htmlFor="inputProductKey" className="sr-only">Product Key</label>
          <Input type="ProductKey" ref='keyBox' placeholder="Product Key..." />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large"  onClick = {this.clickedAddProduct.bind(this)} >Add product</ButtonInput>
          <br></br>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddProduct: bindActionCreators(unboundAddProduct, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Add);
