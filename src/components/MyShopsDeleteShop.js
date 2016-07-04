import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { FormControl, ButtonInput, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { unboundDeleteShop } from '~/src/actions/shops';
import '~/src/styles/shops.css';


class MyShopsDeleteShop extends Component {

  clickedDeleteShop(shopID) {

    let index = _.findIndex(this.props.shops, function(o) {
      return o.id == shopID
    });

    let deleteObject = {
      ID: shopID,
      index: index
    };

    this.props.boundDeleteShop(deleteObject);

    this.setState({
      showModal: false
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  render() {

    var shopID;
    var selected;

    if (this.props.shops.length == 0 || this.props.shopID == 0) {
      selected = {
        name: "Loading..."
      };
    } else {
      shopID = this.props.shopID;

      selected = _.find(this.props.shops, function(o) {
        return o.id == shopID;
      });

    }



    return (
      <div>

        <Button bsStyle="danger" className="b-float-left" onClick={ this.open.bind(this) }>
          <span className="b-button-icon glyphicons remove_2"></span>
          <span className="b-button-text">Delete { selected.name }</span>
        </Button>

        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Permanently delete <b>{ selected.name }</b> ?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-delete">
            <p>You are about to permanently delete this shop. This cannot be undone. Are you sure?</p>
            
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput className="b-float-right" type="submit" bsStyle="primary" onClick={ this.close.bind(this) }>No, close this window</ButtonInput>
            <LinkContainer className="b-float-left" to={ { pathname: `/shops/` } }>
              <ButtonInput type="submit" bsStyle="danger" onClick={ this.clickedDeleteShop.bind(this, this.props.shopID) }>Yes, delete this shop!</ButtonInput>
            </LinkContainer>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  return {
    categories,
    shops
  };
}
;

function mapDispatchToProps(dispatch) {
  return {
    boundDeleteShop: bindActionCreators(unboundDeleteShop, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(MyShopsDeleteShop);
