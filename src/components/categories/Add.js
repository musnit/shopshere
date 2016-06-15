import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Alert, Glyphicon } from 'react-bootstrap';
import { addCategory } from '~/src/actions/categories';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find, map } from 'lodash';

import '~/src/styles/shops.css';




class Add extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      alertVisible: false
    };
  }

  open() {
    this.setState({
      showModal: true
    });
  }
  close() {
    this.setState({
      showModal: false,
      alertVisible: false
    });
  }

  clickedAddCategory() {
    if (this.refs.nameBox.getValue() == "") {
      this.handleNameAlertShow();
      return;
    } else {
      this.handleNameAlertDismiss();
    }

    var addObject = {
      text: this.refs.nameBox.getValue()
    };

    this.props.addCategory(addObject);

    this.setState({
      showModal: false,
      alertVisible: false
    });
  }

  handleNameAlertDismiss() {
    this.setState({
      alertVisible: false
    });
  }

  handleNameAlertShow() {
    this.setState({
      alertVisible: true
    });
  }


  render() {

    return (
      <div className="force-to-bottom">
        <div className="add-shop-btn">
          <Button bsStyle="primary" bsSize="large" onClick={ this.open.bind(this) }>
            <Glyphicon glyph="plus" /> Add a new category
          </Button>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Add a new category:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="inputCategoryName">Name</label>
            <Input type="CategoryName" ref='nameBox' placeholder="Category Name..." required />
            { this.state.alertVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleNameAlertDismiss.bind(this) }>
                <p>Please enter a category name to continue.</p>
              </Alert> : null }
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput type="submit" bsStyle="primary" onClick={ this.clickedAddCategory.bind(this) } disabled={ this.state.submitDisabled }>
              Add category
            </ButtonInput>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {};
}
;

function mapDispatchToProps(dispatch) {
  return {
    addCategory: bindActionCreators(addCategory, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(Add);
