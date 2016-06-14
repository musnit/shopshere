import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import { unboundAddShop } from '~/src/actions/shops';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find, map} from 'lodash';

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

    //validate email

    var emailInput = this.refs.shopContactEmailBox.getValue();

    if (!this.validateEmail(emailInput)) {
      this.handleAlertBadEmailShow();
      shortCircuit = 1;
    }
    else {
      this.handleAlertBadEmailDismiss();
    }



    //validate category

    var catval = this.refs.catBox.getValue();

    

    if (catval == "") {
      this.handleAlertNoCatShow();
      shortCircuit = 1;
    }
    else {
      this.handleAlertNoCatDismiss();
    }


    if (shortCircuit == 1) {
      return;
    }



    var cat = _.find(this.props.categories, function(o) { return o.text == catval});


    var addShopObject = {
      name: this.refs.nameBox.getValue(),

      email: emailInput,
      url: this.refs.shopContactURLBox.getValue(),
      phone: this.refs.shopContactPhoneBox.getValue(),
      address1: this.refs.shopAddressLine1Box.getValue(),
      address2: this.refs.shopAddressLine2Box.getValue(),
      city: this.refs.shopAddressCityBox.getValue(),
      province: this.refs.shopAddressProvinceBox.getValue(),
      category: cat["id"],
      logoFile: this.state.logoFile,
      logoColor:this.refs.colorHexBox.getValue(),
      entranceViewpoint:undefined
    }

    for(var key in addShopObject){
      if (addShopObject[key] == "") {
        addShopObject[key] = undefined;
      }
    }

    this.props.boundAddShop(addShopObject);
    this.refs.nameBox.getInputDOMNode().value = '';

    this.refs.catBox.getInputDOMNode().value = '';
    this.handleAlertNoCatDismiss();
    this.handleAlertBadEmailDismiss();
    this.setState({ showModal: false, logoFile: undefined  });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      logoFile:undefined,
      alertNoCatVisible: false,
      alertBadEmailVisible: false
    };
  }

  close() {
    this.setState({ 
      showModal: false, 
      logoFile: undefined,
      alertNoCatVisible: false,
      alertBadEmailVisible: false
       });
  }

  open() {
    this.setState({ showModal: true });
  }


  imageUploadStarted(){
    this.setState({ submitDisabled: true });
  }

  imageUploadComplete(logoFile){
    this.setState({ submitDisabled: false, logoFile: logoFile });
  }

  clickCategory(name){
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


  handleColorClose(){
    return;
  }

  handleAlertNoCatDismiss(){
    this.setState({alertNoCatVisible: false});
  }

  handleAlertNoCatShow() {
    this.setState({alertNoCatVisible: true});
  }

  handleAlertBadEmailDismiss(){
    this.setState({alertBadEmailVisible: false});
  }

  handleAlertBadEmailShow() {
    this.setState({alertBadEmailVisible: true});
  }


  render() {

    var categories = this.props.categories;

    return (
        <div className="force-to-bottom">
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
                    <Input label="Name" type="ShopName" ref='nameBox' placeholder="Name..." required />
                    <div className="contact-outer">
                        <label >Contact Details:</label>
                        <div className="contact-inner">
                            <Input type="shopContactEmail" label="Email" ref="shopContactEmailBox"  placeholder="Email..."  />

                            {this.state.alertBadEmailVisible ? 
                            <Alert bsStyle="danger" onDismiss={this.handleAlertBadEmailDismiss.bind(this)}>
                              <h4>Please add a valid email address.</h4>
                              <p>The email address entered is either invalid or empty.</p>
                            </Alert> : null}

                            <Input type="shopContactURL" label="URL" ref="shopContactURLBox"  placeholder="URL..." />
                            <Input type="shopContactPhone" label="Phone" ref="shopContactPhoneBox"  placeholder="Phone..."  />
                        </div>
                    </div>
                    <div className="contact-outer">
                        <label >Physical Address:</label>
                        <div className="contact-inner">
                            <Input type="shopAddressLine1" label="Address Line 1" ref="shopAddressLine1Box"  placeholder="Address Line 1..."  />
                            <Input type="shopAddressLine2" label="Address Line 2" ref="shopAddressLine2Box"  placeholder="Address Line 2..." />
                            <Input type="shopAddressCity" label="City" ref="shopAddressCityBox"  placeholder="City..."  />
                            <Input type="shopAddressProvince" label="Province" ref="shopAddressProvinceBox"  placeholder="Province..."  />
                        </div>
                    </div>
                    <label htmlFor="inputShopCategory" className="form-element">Category</label>
                    <div className="cat-button">
                        <DropdownButton bsStyle={'primary'} title={'Select a category'} id="catbutton">
                            {categories.map((categories, index) =>
                            <MenuItem eventKey={index} key={index} onClick={this.clickCategory.bind(this)}> {categories.text} </MenuItem>
                            )}
                        </DropdownButton>
                    </div>
                    <div className="cat-box">
                        <Input type="ShopCat" readOnly ref='catBox' bsClass="input-group"   placeholder="Category..." />
                    </div>

                            {this.state.alertNoCatVisible ? 
                            <Alert bsStyle="danger" onDismiss={this.handleAlertNoCatDismiss.bind(this)}>
                              <h4>Please select a category.</h4>
                              <p>You have not yet selected a category for this shop.</p>
                            </Alert> : null}


                    <label htmlFor="inputShopLogoImageFile" className="form-element">Shop Logo</label><br/>
                    <S3Uploader
                        onUploadStart={this.imageUploadStarted.bind(this)}
                        onUploadFinish={this.imageUploadComplete.bind(this)}
                        folderURL={logoFolderURL}/>
                    <label htmlFor="inputShopLogoBackground" className="form-element">Shop Logo Background Color </label>
                    <Grid fluid>
                        <Row className="padded-row">
                            <Col xs={3} md={3}>
                            <ColorPick handleChange={this.handleChangeComplete.bind(this)} onClosing={this.handleColorClose.bind(this)} index='0'/>
                            </Col>
                            <Col  xs={1} md={1}>
                            <div ref='colorDisplayBox'>
                            </div>
                            </Col>
                            <Col xs={3} md={3}>
                            <Input type="productColorHex" ref='colorHexBox'  readOnly  placeholder="Hex Value"  />
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedAddShop.bind(this)} disabled={this.state.submitDisabled} >
                        {this.state.submitDisabled? 'Wait for upload to finish' : 'Add shop'}
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
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddShop: bindActionCreators(unboundAddShop, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyShopsAddShop);