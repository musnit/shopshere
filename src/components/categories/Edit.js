import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Alert, Grid, Col, Row } from 'react-bootstrap';
import { addCategory } from '~/src/actions/categories';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import fetch from '~/src/components/fetch';
import { fetchCategories, unboundPatchCategory, deleteCategory } from '~/src/actions/categories';
import { find, map } from 'lodash';

import '~/src/styles/shops.css';




class Edit extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      alertVisible: false,
      selectedCategory: {
        text: ""
      }
    };
  }



  open(event) {

    let selected = _.find(this.props.categories, function(o) {
      return o.text == event.target.innerText
    });

    let index = _.findIndex(this.props.categories, function(o) {
      return o.text == event.target.innerText
    });

    selected.index = index


    this.setState({
      showModal: true,
      selectedCategory: selected
    });
  }




  close() {
    this.setState({
      showModal: false,
      alertVisible: false,
      selectedCategory: {
        text: ""
      }
    });
  }

  clickedDeleteCategory() {
    let deleteObject = {
      ID: this.state.selectedCategory.id,
      index: this.state.selectedCategory.index
    };

    this.props.deleteCategory(deleteObject);

    this.setState({
      showModal: false,
      alertVisible: false,
      selectedCategory: {
        text: ""
      }
    });
  }

  clickedPatchCategory() {
    if (this.refs.nameBox.getValue() == "") {
      this.handleNameAlertShow();
      return;
    } else {
      this.handleNameAlertDismiss();
    }

    var patchObject = {
      id: this.state.selectedCategory.id,
      text: this.refs.nameBox.getValue()
    };

    this.props.boundPatchCategory(patchObject);

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
      <div>
        <div className="force-to-bottom">
          <DropdownButton bsStyle={ 'primary' } title={ 'Select a Category to View, Edit or Delete' } id="cat-list" className="add-shop-btn">
            { this.props.categories.map((category, index) => <MenuItem eventKey={ index } key={ index } onClick={ this.open.bind(this) }>
                                                             { category.text } </MenuItem>
              ) }
          </DropdownButton>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Edit category:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="inputCategoryName">Name</label>
            <Input type="text" ref='nameBox' defaultValue={ this.state.selectedCategory.text } placeholder="Category Name..." required />
            { this.state.alertVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleNameAlertDismiss.bind(this) }>
                <p>Please enter a category name to continue.</p>
              </Alert> : null }
          </Modal.Body>
          <Modal.Footer>
            <Grid fluid>
              <Row className="padded-row">
                <Col xs={ 6 } md={ 4 }>
                <ButtonInput className="product-button" type="submit" bsStyle="danger" onClick={ this.clickedDeleteCategory.bind(this) }>Delete category</ButtonInput>
                </Col>
                <Col xs={ 6 } md={ 4 }>
                <ButtonInput className="product-button" type="submit" bsStyle="primary" onClick={ this.clickedPatchCategory.bind(this) }>Edit category</ButtonInput>
                </Col>
              </Row>
            </Grid>
          </Modal.Footer>
        </Modal>
      </div>

      );
  }
}

const FetchedEdit = fetch(Edit, {
  actions: [fetchCategories]
});

function mapStateToProps(state) {
  const categories = state.categories;
  return {
    categories,
  };
}
;

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    boundPatchCategory: bindActionCreators(unboundPatchCategory, dispatch),
    deleteCategory: bindActionCreators(deleteCategory, dispatch)
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(FetchedEdit);
