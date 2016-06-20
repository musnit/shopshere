import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import { addCategory } from '~/src/actions/categories';
import { unboundAddShop } from '~/src/actions/shops';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find, map } from 'lodash';

import '~/src/styles/shops.css';
import ColorPick from '~/src/components/utility/ColorPick';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';


class MyShopsAddShop extends Component {

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  clickedAddShop() {

    var shortCircuit = 0;

    //validate name

    var nameInput = this.refs.nameBox.getValue();

    if (!nameInput) {
      this.handleAlertNoNameShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoNameDismiss();
    }

    //validate email

    var emailInput = this.refs.shopContactEmailBox.getValue();

    if (!this.validateEmail(emailInput)) {
      this.handleAlertBadEmailShow();
      shortCircuit = 1;
    } else {
      this.handleAlertBadEmailDismiss();
    }

    //validate URL
    var URLInput = this.refs.shopContactURLBox.getValue();
    if (!URLInput) {
      this.handleAlertNoURLShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoURLDismiss();
    }

    //validate Phone
    var phoneInput = this.refs.shopContactPhoneBox.getValue();
    if (!phoneInput) {
      this.handleAlertNoPhoneShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoPhoneDismiss();
    }

    //validate Address
    var address1Input = this.refs.shopAddressLine1Box.getValue();
    var address2Input = this.refs.shopAddressLine2Box.getValue();
    var cityInput = this.refs.shopAddressCityBox.getValue();
    var provinceInput = this.refs.shopAddressProvinceBox.getValue();
    var codeInput = this.refs.shopAddressPostBox.getValue();

    if (!address1Input || !address2Input || !cityInput || !provinceInput || !codeInput) {
      this.handleAlertNoAddressShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoAddressDismiss();
    }



    //validate category

    var catval = this.refs.catBox.getValue();

    if (catval == "") {
      this.handleAlertNoCatShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoCatDismiss();
    }

    //validate image

    var logoFileInput = this.state.logoFile;
    if (!logoFileInput) {
      this.handleAlertNoImageShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoImageDismiss();
    }

    if (shortCircuit == 1) {
      return;
    }



    var cat = _.find(this.props.categories, function(o) {
      return o.text == catval
    });


    var addShopObject = {
      name: nameInput,
      email: emailInput,
      url: URLInput,
      phone: phoneInput,
      address1: address1Input,
      address2: address2Input,
      city: cityInput,
      province: provinceInput,
      code: codeInput,
      category: cat["id"],
      logoFile: logoFileInput,
      logoColor: this.refs.colorHexBox.getValue(),
      entranceViewpoint: undefined
    }

    for (var key in addShopObject) {
      if (addShopObject[key] == "") {
        addShopObject[key] = undefined;
      }
    }

    this.props.boundAddShop(addShopObject);
    this.refs.nameBox.getInputDOMNode().value = '';

    this.refs.catBox.getInputDOMNode().value = '';
    this.handleAlertNoCatDismiss();
    this.handleAlertBadEmailDismiss();
    this.handleAlertNoNameDismiss();
    this.handleAlertNoURLDismiss();
    this.handleAlertNoPhoneDismiss();
    this.handleAlertNoAddressDismiss();
    this.handleAlertNoImageDismiss();
    this.setState({
      showModal: false,
      logoFile: undefined
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      logoFile: undefined,
      alertNoCatVisible: false,
      alertBadEmailVisible: false,
      alertNoNameVisible: false,
      alertNoURLVisible: false,
      alertNoPhoneVisible: false,
      alertNoAddressVisible: false,
      alertNoImageVisible: false,
      addCatModalVisible: false
    };
  }

  close() {
    this.setState({
      showModal: false,
      logoFile: undefined,
      alertNoCatVisible: false,
      alertBadEmailVisible: false,
      alertNoNameVisible: false,
      alertNoURLVisible: false,
      alertNoPhoneVisible: false,
      alertNoAddressVisible: false,
      alertNoImageVisible: false,
      addCatModalVisible: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }


  imageUploadStarted() {
    this.setState({
      submitDisabled: true
    });
  }

  imageUploadComplete(logoFile) {
    this.setState({
      submitDisabled: false,
      logoFile: logoFile
    });
  }

  clickCategory(name) {
    this.refs.catBox.getInputDOMNode().value = name.target.innerText;
  }

  handleChangeComplete(color) {

    var refstring = 'colorHexBox'
    var refstring2 = 'colorDisplayBox'

    this.refs[refstring].refs.input.value = color.hex;

    this.refs[refstring2].style.backgroundColor = color.hex;
    this.refs[refstring2].style.height = '30px';
    this.refs[refstring2].style.width = '30px';
    this.refs[refstring2].style.borderRadius = '20px';
  }


  handleColorClose() {
    return;
  }

  handleAlertNoNameDismiss() {
    this.setState({
      alertNoNameVisible: false
    });
  }

  handleAlertNoNameShow() {
    this.setState({
      alertNoNameVisible: true
    });
  }

  handleAlertNoCatDismiss() {
    this.setState({
      alertNoCatVisible: false
    });
  }

  handleAlertNoCatShow() {
    this.setState({
      alertNoCatVisible: true
    });
  }

  handleAlertBadEmailDismiss() {
    this.setState({
      alertBadEmailVisible: false
    });
  }

  handleAlertBadEmailShow() {
    this.setState({
      alertBadEmailVisible: true
    });
  }

  handleAlertNoURLDismiss() {
    this.setState({
      alertNoURLVisible: false
    });
  }

  handleAlertNoURLShow() {
    this.setState({
      alertNoURLVisible: true
    });
  }

  handleAlertNoPhoneDismiss() {
    this.setState({
      alertNoPhoneVisible: false
    });
  }

  handleAlertNoPhoneShow() {
    this.setState({
      alertNoPhoneVisible: true
    });
  }

  handleAlertNoAddressDismiss() {
    this.setState({
      alertNoAddressVisible: false
    });
  }

  handleAlertNoAddressShow() {
    this.setState({
      alertNoAddressVisible: true
    });
  }

  handleAlertNoImageDismiss() {
    this.setState({
      alertNoImageVisible: false
    });
  }

  handleAlertNoImageShow() {
    this.setState({
      alertNoImageVisible: true
    });
  }

  clickedAddCategory() {
    this.setState({
      addCatModalVisible: true
    });
  }

  clickedSubmitCategory() {
    if (this.refs.newCatNameBox.getValue() == "") {
      return;
    }

    var addObject = {
      text: this.refs.newCatNameBox.getValue()
    };

    this.props.addCategory(addObject);

    this.refs.catBox.getInputDOMNode().value = this.refs.newCatNameBox.getValue();

    this.setState({
      addCatModalVisible: false,
    });
  }



  render() {

    var categories = this.props.categories;

    return (
      <div className="force-to-bottom">
        <div className="add-shop-btn">
          <Button bsStyle="primary" bsSize="large" onClick={ this.open.bind(this) }>
            Add a new shop
          </Button>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Add a new shop:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input label="Name" type="text" ref='nameBox' placeholder="Name..." required />
            { this.state.alertNoNameVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
                <p>Shop name is required.</p>
              </Alert> : null }
            <div className="contact-outer">
              <label>Contact Details:</label>
              <div className="contact-inner">
                <Input type="email" label="Email" ref="shopContactEmailBox" placeholder="Email..." />
                { this.state.alertBadEmailVisible ?
                  <Alert bsStyle="danger" onDismiss={ this.handleAlertBadEmailDismiss.bind(this) }>
                    <p>Email address is either invalid or empty.</p>
                  </Alert> : null }
                <Input type="url" label="URL" ref="shopContactURLBox" placeholder="URL..." />
                { this.state.alertNoURLVisible ?
                  <Alert bsStyle="danger" onDismiss={ this.handleAlertNoURLDismiss.bind(this) }>
                    <p>Shop URL is required.</p>
                  </Alert> : null }
                <Input type="tel" label="Phone" ref="shopContactPhoneBox" placeholder="Phone..." />
                { this.state.alertNoPhoneVisible ?
                  <Alert bsStyle="danger" onDismiss={ this.handleAlertNoPhoneDismiss.bind(this) }>
                    <p>Shop contact phone number is required.</p>
                  </Alert> : null }
              </div>
            </div>
            <div className="contact-outer">
              <label>Physical Address:</label>
              <div className="contact-inner">
                <Input type="text" label="Address Line 1" ref="shopAddressLine1Box" placeholder="Address Line 1..." />
                <Input type="text" label="Address Line 2" ref="shopAddressLine2Box" placeholder="Address Line 2..." />
                <Input type="text" label="City" ref="shopAddressCityBox" placeholder="City..." />
                <Input type="text" label="Province" ref="shopAddressProvinceBox" placeholder="Province..." />
                <Input type="text" label="Postal Code" ref="shopAddressPostBox" placeholder="Post Code..." />
              </div>
              { this.state.alertNoAddressVisible ?
                <Alert bsStyle="danger" onDismiss={ this.handleAlertNoAddressDismiss.bind(this) }>
                  <p>All address fields are required.</p>
                </Alert> : null }
            </div>
            <label htmlFor="inputShopCategory" className="form-element">Category</label>
            <div className="cat-button">
              <DropdownButton bsStyle={ 'primary' } title={ 'Select a category' } id="catbutton">
                { categories.map((categories, index) => <MenuItem eventKey={ index } key={ index } onClick={ this.clickCategory.bind(this) }>
                                                        { categories.text } </MenuItem>
                  ) }
                <MenuItem divider />
                <MenuItem onClick={ this.clickedAddCategory.bind(this) }> <b>Add a new category...</b> </MenuItem>
              </DropdownButton>
            </div>
            <div className="cat-box">
              <Input type="text" readOnly ref='catBox' bsClass="input-group" placeholder="Category..." />
            </div>
            { this.state.addCatModalVisible ?
              <div className="addcatbox">
                <div className="catside">
                  <Input label="New Category Name" type="text" ref='newCatNameBox' placeholder="Category Name..." required />
                </div>
                <div className="catside">
                  <ButtonInput type="submit" bsStyle="primary" onClick={ this.clickedSubmitCategory.bind(this) }>
                    Add category
                  </ButtonInput>
                </div>
              </div>
              : null }
            { this.state.alertNoImageVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoImageDismiss.bind(this) }>
                <p>A shop Logo Image is required.</p>
              </Alert> : null }
            <label htmlFor="inputShopLogoImageFile" className="form-element">Shop Logo</label>
            <br/>
            <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ logoFolderURL } />
            { this.state.alertNoImageVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoImageDismiss.bind(this) }>
                <p>A shop Logo Image is required.</p>
              </Alert> : null }
            <label htmlFor="inputShopLogoBackground" className="form-element">Shop Logo Background Color </label>
            <Grid fluid>
              <Row className="padded-row">
                <Col xs={ 3 } md={ 3 }>
                <ColorPick handleChange={ this.handleChangeComplete.bind(this) } onClosing={ this.handleColorClose.bind(this) } index='0' />
                </Col>
                <Col xs={ 1 } md={ 1 }>
                <div ref='colorDisplayBox'>
                </div>
                </Col>
                <Col xs={ 3 } md={ 3 }>
                <Input type="text" ref='colorHexBox' readOnly placeholder="Hex Value" />
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput type="submit" bsStyle="primary" onClick={ this.clickedAddShop.bind(this) } disabled={ this.state.submitDisabled }>
              { this.state.submitDisabled ? 'Wait for upload to finish' : 'Add shop' }
            </ButtonInput>
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
}
;

function mapDispatchToProps(dispatch) {
  return {
    boundAddShop: bindActionCreators(unboundAddShop, dispatch),
    addCategory: bindActionCreators(addCategory, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(MyShopsAddShop);