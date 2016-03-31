import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts } from '~/src/actions/products';
import { Input, ButtonInput, Modal, Button} from 'react-bootstrap';



class List extends Component {

  componentWillUnmount() {
    this.props.clearProducts();
    }

   componentWillReceiveProps(nextProps) {
   if(nextProps.data !== this.props.data){
    this.props.clearProducts();
    this.props.fetchProducts({data: nextProps.data});
   }
  }

  handleChange(event) {
  var val = event.target.value;
  //console.log(val);
  }

  render() {

    return (
      <div>
          <label>Select a product to view/edit:</label>
          <select onChange={this.handleChange.bind(this)}>
              <option disabled>--</option>
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