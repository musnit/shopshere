import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { unboundDeleteShop } from '~/src/actions/shops';
import '~/src/styles/shops.css';


class MyShopsDeleteShop extends Component {

  clickedDeleteShop(name) {

    let index = _.findIndex(this.props.shops, function(o) { return o.name == name});

    let deleteObject = {
      name: name,
      index: index
    };

    this.props.boundDeleteShop(deleteObject);

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
      <div className="force-to-bottom">
        <div className="add-shop-btn">
          <Button
            bsStyle="danger"
            bsSize="large"
            onClick={this.open.bind(this)}
          >
            Delete <b>{this.props.data}</b>
          </Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Permanently delete <b>{this.props.data}</b> ?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-delete">

            <ButtonInput className="delete-modal-button" type="submit" bsStyle="primary" onClick = {this.close.bind(this)} >No, close this window.</ButtonInput>
            <LinkContainer to={{ pathname: `/shops/` }}>
              <ButtonInput className="delete-modal-button" type="submit" bsStyle="danger" onClick = {this.clickedDeleteShop.bind(this, this.props.data)} >Yes, delete this shop!</ButtonInput>
            </LinkContainer>

          </Modal.Body>
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
    boundDeleteShop: bindActionCreators(unboundDeleteShop, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyShopsDeleteShop);
