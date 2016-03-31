import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import List from '~/src/components/products/List';
import Add from '~/src/components/products/Add';

class Products extends Component {
  render() {
    return (
        <div>
          <List data={this.props.data} />
          <Add data={this.props.data} />
        </div>
    );
  }
}

export default Products;
