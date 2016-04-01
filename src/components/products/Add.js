import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button } from 'react-bootstrap';
import { unboundAddProduct } from '~/src/actions/products';
import '~/src/styles/product.css';


class Add extends Component {

  clickedAddProduct() {
    this.props.boundAddProduct({
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
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>

        <div className="product-button">
          <Button             
            bsStyle="primary"
            bsSize="large"
            onClick={this.open.bind(this)}
          >
            Add a new product
          </Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Product:</Modal.Title>
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
          <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedAddProduct.bind(this)} >Add product</ButtonInput>
          </Modal.Footer>
        </Modal>

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
