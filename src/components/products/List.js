import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts, unboundPatchProduct, deleteProduct } from '~/src/actions/products';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import { find, findIndex } from 'lodash';
import '~/src/styles/product.css';


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

  clickedPatchProduct() {

    let clickDescription = this.refs.descriptionBox.getValue() ? this.refs.descriptionBox.getValue() : this.refs.descriptionBox.props.placeholder;
    let clickPrice = this.refs.priceBox.getValue() ? this.refs.priceBox.getValue() : this.refs.priceBox.props.placeholder;

    this.props.boundPatchProduct({
      name: this.state.selectedProduct.name,
      key: this.state.selectedProduct.key,
      description: clickDescription,
      price: clickPrice,
      shop: this.props.data
    });
    this.refs.descriptionBox.getInputDOMNode().value = '';
    this.refs.priceBox.getInputDOMNode().value = '';
    this.setState({ showModal: false });
  }

  clickedDeleteProduct() {

    let deleteObject = {
      name: this.state.selectedProduct.name,
      index: this.state.selectedProduct.index
    };

    this.props.deleteProduct(deleteObject);

    this.setState({ 
      showModal: false,
      selectedProduct: {}
     });
  }


  constructor(props) {
    super(props);
      this.state = {
        showModal: false,
        selectedProduct: {}
      };
  }

  close() {
    this.setState({ 
      showModal: false,
      selectedProduct: {}
    });
  }

  open(name) {

    let selected = _.find(this.props.products, function(o) { return o.name == name.target.innerText});
    let index = _.findIndex(this.props.products, function(o) { return o.name == name.target.innerText});

    selected.index = index

    this.setState({ 
      showModal: true ,
      selectedProduct: selected
    });
  }

  render() {

    return (

      <div className="product-button">

        <DropdownButton bsStyle={'primary'} title={'Select a product to view/edit'} id="product-view-edit">

          {this.props.products.map((product, index) =>
            <MenuItem eventKey={index} key={index} onClick={this.open.bind(this)}> {product.name} </MenuItem>
                )}

        </DropdownButton>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit <b>{this.state.selectedProduct.name}</b> by modifying it below and then click Edit product</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Input label="Product Name" readOnly="true" type="ProductName" ref='nameBox' placeholder={this.state.selectedProduct.name} />

          <Input label="Product Description" type="ProductDescription" ref='descriptionBox' placeholder={this.state.selectedProduct.description}/>

          <Input label="Product Price" type="ProductPrice" ref='priceBox' placeholder={this.state.selectedProduct.price} />


          </Modal.Body>
          <Modal.Footer>
          <ButtonInput className="product-button" type="submit" bsStyle="primary" onClick = {this.clickedPatchProduct.bind(this)} >Edit product</ButtonInput>
          <ButtonInput className="product-button" type="submit" bsStyle="danger" onClick = {this.clickedDeleteProduct.bind(this)} >Delete this product!</ButtonInput>
          </Modal.Footer>
        </Modal>

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
    clearProducts: bindActionCreators(clearProducts, dispatch),
    boundPatchProduct: bindActionCreators(unboundPatchProduct, dispatch),
    deleteProduct: bindActionCreators(deleteProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedList);