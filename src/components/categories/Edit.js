import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Alert, Grid, Col, Row } from 'react-bootstrap';
import { addCategory } from '~/src/actions/categories';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import fetch from '~/src/components/fetch';
import { fetchCategories, unboundPatchCategory, deleteCategory } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import { find, map } from 'lodash';

import '~/src/styles/shops.css';




class Edit extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      alertVisible: false,
      alertUnableToDelete: false,
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
      alertUnableToDelete: false,
      selectedCategory: {
        text: ""
      }
    });
  }

  clickedDeleteCategory() {

    var selectedCategoryID = this.state.selectedCategory.id;

    var stillSomeShopsWithCategory = _.find(this.props.shops, function(o) {
      return o.category == selectedCategoryID
    });

    if (stillSomeShopsWithCategory) {

      this.handleAlertUnableToDeleteShow();
      return
    }

    let deleteObject = {
      ID: selectedCategoryID,
      index: this.state.selectedCategory.index
    };

    this.props.deleteCategory(deleteObject);

    this.setState({
      showModal: false,
      alertVisible: false,
      alertUnableToDelete: false,
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

  handleAlertUnableToDeleteDismiss() {
    this.setState({
      alertUnableToDelete: false
    });
  }

  handleAlertUnableToDeleteShow() {
    this.setState({
      alertUnableToDelete: true
    });
  }


  render() {



    return (
      <div>
        <div className="force-to-bottom">
          <DropdownButton bsStyle={ 'info' } title={ 'Select a Category to View, Edit or Delete' } id="cat-list" className="add-shop-btn">
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
            <Input label="Name" type="text" ref='nameBox' defaultValue={ this.state.selectedCategory.text } placeholder="Category Name..." required />
            { this.state.alertVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleNameAlertDismiss.bind(this) }>
                <p>Please enter a category name to continue.</p>
              </Alert> : null }
          </Modal.Body>
          <Modal.Footer>
            
            <ButtonInput className="b-float-left" type="submit" bsStyle="danger" onClick={ this.clickedDeleteCategory.bind(this) }>Delete category</ButtonInput>
            <ButtonInput className="b-float-right" type="submit" bsStyle="info" onClick={ this.clickedPatchCategory.bind(this) }>Save Changes</ButtonInput>

            { this.state.alertUnableToDelete ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertUnableToDeleteDismiss.bind(this) }>
                <p>You cannot delete a category that still has some shops assigned to it. Either delete these shops or assign them to a different category in order to delete this
                  category.
                </p>
              </Alert> : null }
          </Modal.Footer>
        </Modal>
      </div>

      );
  }
}

const FetchedEdit = fetch(Edit, {
  actions: [fetchShops, fetchCategories]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  return {
    categories,
    shops
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch),
    boundPatchCategory: bindActionCreators(unboundPatchCategory, dispatch),
    deleteCategory: bindActionCreators(deleteCategory, dispatch)
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(FetchedEdit);
