import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts, unboundPatchProduct } from '~/src/actions/products';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem} from 'react-bootstrap';
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
    this.props.boundPatchProduct({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      description: this.refs.descriptionBox.getValue(),
      price: this.refs.priceBox.getValue(),
      shop: this.props.data
    });
    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.keyBox.getInputDOMNode().value = '';
    this.refs.descriptionBox.getInputDOMNode().value = '';
    this.refs.priceBox.getInputDOMNode().value = '';
    this.setState({ showModal: false });
  }


  constructor(props) {
    super(props);
      this.state = {
        showModal: false,
        selectedProduct: {
          name: "",
          key: "",
          description: "",
          price: "",
          shop: ""
        }
      };
  }

  close() {
    this.setState({ showModal: false });
  }

  open(name) {
    this.setState({ 
      showModal: true ,
      selectedProduct: {
          name: name.target.innerText,
          key: "",
          description: "",
          price: "",
          shop: ""
        }
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

        <Modal show={this.state.showModal} onHide={this.close.bind(this)} prod={this.state.selectedProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {this.state.selectedProduct.name}:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <label htmlFor="inputProductName">Product Name</label>
          <Input type="ProductName" ref='nameBox' placeholder="Name..." required />

          <label htmlFor="inputProductKey">Product Key</label>
          <Input type="ProductKey" ref='keyBox' placeholder="Key..." />

          <label htmlFor="inputProductDescription">Product Description</label>
          <Input type="ProductDescription" ref='descriptionBox' placeholder="Description..." />

          <label htmlFor="inputProductPrice">Product Price</label>
          <Input type="ProductPrice" ref='priceBox' placeholder="Price..." />


          </Modal.Body>
          <Modal.Footer>
          <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedPatchProduct.bind(this)} >Edit product</ButtonInput>
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
    boundPatchProduct: bindActionCreators(unboundPatchProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedList);