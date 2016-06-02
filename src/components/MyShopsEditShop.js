import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem,Grid, Row, Col, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { unboundPatchShop } from '~/src/actions/shops';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find} from 'lodash';

import '~/src/styles/shops.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';


class MyShopsEditShop extends Component {

  clickedEditShop() {

    var catval = this.refs.catBox.getValue();

    var cat = _.find(this.props.categories, function(o) { return o.name == catval});

    var logo;

    if (this.state.logoFile) {
      logo = this.state.logoFile;
    }
    else {
      logo = this.state.selectedShop.logoFile;
    }

    var patchShopObject = {
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      email: this.refs.shopContactEmailBox.getValue(),
      url: this.refs.shopContactURLBox.getValue(),
      phone: this.refs.shopContactPhoneBox.getValue(),
      address1: this.refs.shopAddressLine1Box.getValue(),
      address2: this.refs.shopAddressLine2Box.getValue(),
      city: this.refs.shopAddressCityBox.getValue(),
      province: this.refs.shopAddressProvinceBox.getValue(),
      category: cat["name"],
      logoFile: logo,
      logoColor:this.refs.backgroundColorBox.getValue(),
    }

    for(var key in patchShopObject){
      if (patchShopObject[key] == "") {
        patchShopObject[key] = undefined;
      }
    }

    this.props.boundPatchShop(patchShopObject);
    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.keyBox.getInputDOMNode().value = '';
    this.refs.catBox.getInputDOMNode().value = '';
    this.setState({ showModal: false, logoFile: undefined, changeImage:false, selectedShop: {}  });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedShop: {},
      changeImage:false,
      logoFile:undefined
    };
  }

  close() {
    this.setState({ showModal: false, logoFile: undefined, changeImage:false, selectedShop: {}  });
  }

  open() {

    var shopName = this.props.data;

    let selected = _.find(this.props.shops, function(o) { return o.name == shopName;});

    this.setState({ 
      showModal: true,
      selectedShop: selected,
      logoFile:undefined
    });
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

  clickedDeleteImage(){
    this.setState({ changeImage: true });
  }

  render() {

    return (
        <div className="force-to-bottom">
            <div className="add-shop-btn">
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open.bind(this)}
                    >
                Edit <b>{this.props.data}</b>
                </Button>
            </div>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new shop:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input label="Name" type="ShopName" readOnly="true" ref='nameBox' defaultValue={this.state.selectedShop.name} required />
                    <Input label="Key" type="ShopKey" ref='keyBox' defaultValue={this.state.selectedShop.key} />
                    <div className="contact-outer">
                        <label >Contact Details:</label>
                        <div className="contact-inner">
                            <Input type="shopContactEmail" label="Email" ref="shopContactEmailBox"  defaultValue={this.state.selectedShop.email}  />
                            <Input type="shopContactURL" label="URL" ref="shopContactURLBox"  defaultValue={this.state.selectedShop.url} />
                            <Input type="shopContactPhone" label="Phone" ref="shopContactPhoneBox"  defaultValue={this.state.selectedShop.phone}  />
                        </div>
                    </div>
                    <div className="contact-outer">
                        <label >Physical Address:</label>
                        <div className="contact-inner">
                            <Input type="shopAddressLine1" label="Address Line 1" ref="shopAddressLine1Box"  defaultValue={this.state.selectedShop.address1}  />
                            <Input type="shopAddressLine2" label="Address Line 2" ref="shopAddressLine2Box"  defaultValue={this.state.selectedShop.address2} />
                            <Input type="shopAddressCity" label="City" ref="shopAddressCityBox"  defaultValue={this.state.selectedShop.city}  />
                            <Input type="shopAddressProvince" label="Province" ref="shopAddressProvinceBox"  defaultValue={this.state.selectedShop.province}  />
                        </div>
                    </div>
                    <label htmlFor="inputShopCategory" className="form-element">Category</label>
                    <div className="cat-button">
                        <DropdownButton bsStyle={'primary'} title={'Select a category'} id="catbutton">
                            {this.props.categories.map((categories, index) =>
                            <MenuItem eventKey={index} key={index} onClick={this.clickCategory.bind(this)}> {categories.name} </MenuItem>
                            )}
                        </DropdownButton>
                    </div>
                    <div className="cat-box">
                        <Input type="ShopCat" readOnly ref='catBox' bsClass="input-group"   defaultValue={this.state.selectedShop.category} />
                    </div>
                    <label htmlFor="inputShopLogoImageFile" className="form-element">Shop Logo</label><br/>
                    {!this.state.changeImage                                 ?
                    <Grid fluid>
                        <div>
                            <Row className="padded-row">
                                <Col xs={8} md={8}>
                                <Image src={this.state.selectedShop.logoFile} responsive />
                                </Col>
                                <Col xs={1} md={1}>
                                <div>
                                    <OverlayTrigger overlay={
                                    <Tooltip id="remove-image" >Remove image.</Tooltip>
                                    }>
                                    <Button bsStyle="danger" onClick = {this.clickedDeleteImage.bind(this)}>Change Logo</Button>
                                    </OverlayTrigger>
                                </div>
                                </Col> 
                            </Row>
                        </div>
                    </Grid>
                    :
                    <S3Uploader
                        onUploadStart={this.imageUploadStarted.bind(this)}
                        onUploadFinish={this.imageUploadComplete.bind(this)}
                        folderURL={logoFolderURL}/>
                      }
                    <label htmlFor="inputShopLogoBackground" className="form-element">Shop Logo Background Color (Hex Value)</label>
                    <Input type="ShopLogoBackground" ref='backgroundColorBox' defaultValue={this.state.selectedShop.logoColor} />
                </Modal.Body>
                <Modal.Footer>
                    <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedEditShop.bind(this)} disabled={this.state.submitDisabled} >
                        {this.state.submitDisabled? 'Wait for upload to finish' : 'Edit shop'}
                    </ButtonInput>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
}

const FetchedCategoryEditShopList = fetch(MyShopsEditShop, {
  actions: [fetchCategories]
});

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  return { 
    categories,
    shops
    };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch),
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(FetchedCategoryEditShopList);