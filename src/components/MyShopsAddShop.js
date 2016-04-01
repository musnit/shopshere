import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button } from 'react-bootstrap';
import { unboundAddShop } from '~/src/actions/shops';
import '~/src/styles/shops.css';


class MyShopsAddShop extends Component {

  clickedAddShop() {
    this.props.boundAddShop({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue()
    });
    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.keyBox.getInputDOMNode().value = '';
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
        <div className="add-shop-btn">
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open.bind(this)}
          >
            Add a new shop
          </Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new shop:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <label htmlFor="inputShopName">Shop Name</label>
          <Input type="ShopName" ref='nameBox' placeholder="Name..." required />
          <label htmlFor="inputShopKey">Shop Key</label>
          <Input type="ShopKey" ref='keyBox' placeholder="Key..." />


          </Modal.Body>
          <Modal.Footer>
           <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedAddShop.bind(this)} >Add a shop</ButtonInput>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = state.shops;
  return {
    shops
  };
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddShop: bindActionCreators(unboundAddShop, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyShopsAddShop);
