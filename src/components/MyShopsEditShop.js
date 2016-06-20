import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image, Alert } from 'react-bootstrap';
import { fetchViewpoints } from '~/src/actions/viewpoints';
import { unboundPatchShop } from '~/src/actions/shops';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import ColorPick from '~/src/components/utility/ColorPick';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find } from 'lodash';

import '~/src/styles/shops.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';


class MyShopsEditShop extends Component {


  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  clickedEditShop() {

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


    var catval = this.refs.catBox.getValue();

    if (catval == "") {
      this.handleAlertNoCatShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoCatDismiss();
    }

    var cat = _.find(this.props.categories, function(o) {
      return o.text == catval
    });

    var entVPval = this.refs.entranceViewpointBox.getValue();

    if (entVPval == "") {
      this.handleAlertNoEVPShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoEVPDismiss();
    }

    if (shortCircuit == 1) {
      return;
    }

    var viewp = _.find(this.props.viewpoints, function(o) {
      return o.name == entVPval
    });

    var logo;

    if (this.state.logoFile) {
      logo = this.state.logoFile;
    } else {
      logo = this.state.selectedShop.logoFile;
    }

    var patchShopObject = {
      id: this.state.selectedShop.id,
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
      logoFile: logo,
      logoColor: this.refs.colorHexBox.getValue(),
      entranceViewpoint: viewp["id"]
    }

    for (var key in patchShopObject) {
      if (patchShopObject[key] == "") {
        patchShopObject[key] = undefined;
      }
    }

    this.props.boundPatchShop(patchShopObject);
    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.catBox.getInputDOMNode().value = '';
    this.handleAlertNoCatDismiss();
    this.handleAlertBadEmailDismiss();
    this.handleAlertNoEVPDismiss();
    this.setState({
      showModal: false,
      logoFile: undefined,
      changeImage: false,
      selectedShop: {}
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedShop: {},
      changeImage: false,
      logoFile: undefined,
      alertNoCatVisible: false,
      alertBadEmailVisible: false,
      alertNoEVPVisible: false,
      alertNoNameVisible: false,
      alertNoURLVisible: false,
      alertNoPhoneVisible: false,
      alertNoAddressVisible: false,
      alertNoImageVisible: false
    };
  }

  close() {
    this.setState({
      showModal: false,
      logoFile: undefined,
      changeImage: false,
      selectedShop: {},
      alertNoCatVisible: false,
      alertBadEmailVisible: false,
      alertNoEVPVisible: false,
      alertNoNameVisible: false,
      alertNoURLVisible: false,
      alertNoPhoneVisible: false,
      alertNoAddressVisible: false,
      alertNoImageVisible: false
    });
  }

  open() {

    var shopID = this.props.shopID;

    let selected = _.find(this.props.shops, function(o) {
      return o.id == shopID;
    });

    this.setState({
      showModal: true,
      selectedShop: selected,
      logoFile: undefined
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

  clickCategory(event) {
    this.refs.catBox.getInputDOMNode().value = event.target.innerText;
  }

  clickViewpoint(event) {
    this.refs.entranceViewpointBox.getInputDOMNode().value = event.target.innerText;
  }

  clickedDeleteImage() {
    this.setState({
      changeImage: true
    });
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

  setColorBoxes() {

    var refToThis = this;
    var refstring2 = 'colorDisplayBox'
    refToThis.refs[refstring2].style.backgroundColor = this.state.selectedShop.logoColor;
    refToThis.refs[refstring2].style.height = '30px';
    refToThis.refs[refstring2].style.width = '30px';
    refToThis.refs[refstring2].style.borderRadius = '20px';

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

  handleAlertNoEVPDismiss() {
    this.setState({
      alertNoEVPVisible: false
    });
  }

  handleAlertNoEVPShow() {
    this.setState({
      alertNoEVPVisible: true
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



  render() {

    var shopID;
    var selected;
    var catID;
    var catText;
    var entVPID;
    var entVPText;

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

    if (this.props.categories.length == 0 || !selected.category) {
      catText = ""
    } else {
      catID = selected.category;

      catText = _.find(this.props.categories, function(o) {
        return o.id == catID
      }).text;
    }

    if (this.props.viewpoints.length == 0 || !selected.entranceViewpoint) {
      entVPText = ""
    } else {

      entVPID = selected.entranceViewpoint;

      if (entVPID.id) {
        entVPText = _.find(this.props.viewpoints, function(o) {
          return o.id == entVPID
        }).name;
      }

    }

    return (
      <div className="force-to-bottom">
        <div className="add-shop-btn">
          <Button bsStyle="primary" bsSize="large" onClick={ this.open.bind(this) }>
            Edit <b>{ selected.name }</b>
          </Button>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) } onEntered={ this.setColorBoxes.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Edit <b>{ this.state.selectedShop.name }</b>:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input label="Name" type="text" ref='nameBox' defaultValue={ this.state.selectedShop.name } required />
            { this.state.alertNoNameVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
                <p>Shop name is required.</p>
              </Alert> : null }
            <div className="contact-outer">
              <label>Contact Details:</label>
              <div className="contact-inner">
                <Input type="email" label="Email" ref="shopContactEmailBox" defaultValue={ this.state.selectedShop.email } />
                { this.state.alertBadEmailVisible ?
                  <Alert bsStyle="danger" onDismiss={ this.handleAlertBadEmailDismiss.bind(this) }>
                    <h4>Please add a valid email address.</h4>
                    <p>The email address entered is either invalid or empty.</p>
                  </Alert> : null }
                <Input type="url" label="URL" ref="shopContactURLBox" defaultValue={ this.state.selectedShop.url } />
                { this.state.alertNoURLVisible ?
                  <Alert bsStyle="danger" onDismiss={ this.handleAlertNoURLDismiss.bind(this) }>
                    <p>Shop URL is required.</p>
                  </Alert> : null }
                <Input type="tel" label="Phone" ref="shopContactPhoneBox" defaultValue={ this.state.selectedShop.phone } />
                { this.state.alertNoPhoneVisible ?
                  <Alert bsStyle="danger" onDismiss={ this.handleAlertNoPhoneDismiss.bind(this) }>
                    <p>Shop contact phone number is required.</p>
                  </Alert> : null }
              </div>
            </div>
            <div className="contact-outer">
              <label>Physical Address:</label>
              <div className="contact-inner">
                <Input type="text" label="Address Line 1" ref="shopAddressLine1Box" defaultValue={ this.state.selectedShop.address1 } />
                <Input type="text" label="Address Line 2" ref="shopAddressLine2Box" defaultValue={ this.state.selectedShop.address2 } />
                <Input type="text" label="City" ref="shopAddressCityBox" defaultValue={ this.state.selectedShop.city } />
                <Input type="text" label="Province" ref="shopAddressProvinceBox" defaultValue={ this.state.selectedShop.province } />
                <Input type="text" label="Postal Code" ref="shopAddressPostBox" defaultValue={ this.state.selectedShop.code } />
              </div>
              { this.state.alertNoAddressVisible ?
                <Alert bsStyle="danger" onDismiss={ this.handleAlertNoAddressDismiss.bind(this) }>
                  <p>All address fields are required.</p>
                </Alert> : null }
            </div>
            <label htmlFor="inputShopCategory" className="form-element">Category</label>
            <div className="cat-button">
              <DropdownButton bsStyle={ 'primary' } title={ 'Select a category' } id="catbutton">
                { this.props.categories.map((categories, index) => <MenuItem eventKey={ index } key={ index } onClick={ this.clickCategory.bind(this) }>
                                                                   { categories.text } </MenuItem>
                  ) }
              </DropdownButton>
            </div>
            <div className="cat-box">
              <Input type="text" readOnly ref='catBox' bsClass="input-group" defaultValue={ catText } />
            </div>
            { this.state.alertNoCatVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoCatDismiss.bind(this) }>
                <h4>Please select a category.</h4>
                <p>You have not yet selected a category for this shop.</p>
              </Alert> : null }
            <label htmlFor="inputShopEntranceViewpoint" className="form-element">Entrance Viewpoint</label>
            <div className="cat-button">
              <DropdownButton bsStyle={ 'primary' } title={ 'Select an entrance viewpoint' } id="catbutton">
                { this.props.viewpoints.map((viewpoint, index) => <MenuItem eventKey={ index } key={ index } data={ viewpoint.id } onClick={ this.clickViewpoint.bind(this) }>
                                                                  { viewpoint.name } </MenuItem>
                  ) }
              </DropdownButton>
            </div>
            <div className="cat-box">
              <Input type="text" readOnly ref='entranceViewpointBox' bsClass="input-group" defaultValue={ entVPText } />
            </div>
            { this.state.alertNoEVPVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoEVPDismiss.bind(this) }>
                <p>Please select an entrance viewpoint for this shop.</p>
              </Alert> : null }
            <label htmlFor="inputShopLogoImageFile" className="form-element">Shop Logo</label>
            <br/>
            { !this.state.changeImage ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 8 } md={ 8 }>
                    <Image src={ this.state.selectedShop.logoFile } responsive />
                    </Col>
                    <Col xs={ 1 } md={ 1 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove image.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteImage.bind(this) }>Change Logo</Button>
                      </OverlayTrigger>
                    </div>
                    </Col>
                  </Row>
                </div>
              </Grid>
              :
              <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ logoFolderURL } /> }
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
                <Input type="text" ref='colorHexBox' readOnly defaultValue={ this.state.selectedShop.logoColor } placeholder="Hex Value" />
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput type="submit" bsStyle="primary" onClick={ this.clickedEditShop.bind(this) } disabled={ this.state.submitDisabled }>
              { this.state.submitDisabled ? 'Wait for upload to finish' : 'Edit shop' }
            </ButtonInput>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

const FetchedCategoryEditShopList = fetch(MyShopsEditShop, {
  actions: [fetchCategories, fetchViewpoints]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  const viewpoints = state.viewpoints;
  return {
    categories,
    shops,
    viewpoints
  };
}
;

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch),
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch),
    fetchViewpoints: bindActionCreators(fetchViewpoints, dispatch)
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(FetchedCategoryEditShopList);