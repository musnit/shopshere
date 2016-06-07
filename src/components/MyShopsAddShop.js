import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { unboundAddShop } from '~/src/actions/shops';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find, map} from 'lodash';

import '~/src/styles/shops.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';


class MyShopsAddShop extends Component {

  clickedAddShop() {

    var catval = this.refs.catBox.getValue();

    var cat = _.find(this.props.categories, function(o) { return o.text == catval});

    var addShopObject = {
      name: this.refs.nameBox.getValue(),

      email: this.refs.shopContactEmailBox.getValue(),
      url: this.refs.shopContactURLBox.getValue(),
      phone: this.refs.shopContactPhoneBox.getValue(),
      address1: this.refs.shopAddressLine1Box.getValue(),
      address2: this.refs.shopAddressLine2Box.getValue(),
      city: this.refs.shopAddressCityBox.getValue(),
      province: this.refs.shopAddressProvinceBox.getValue(),
      category: cat["id"],
      logoFile: this.state.logoFile,
      logoColor:this.refs.backgroundColorBox.getValue(),
    }

    for(var key in addShopObject){
      if (addShopObject[key] == "") {
        addShopObject[key] = undefined;
      }
    }

    this.props.boundAddShop(addShopObject);
    this.refs.nameBox.getInputDOMNode().value = '';

    this.refs.catBox.getInputDOMNode().value = '';
    this.setState({ showModal: false, logoFile: undefined  });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      logoFile:undefined
    };
  }

  close() {
    this.setState({ showModal: false, logoFile: undefined });
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
                    <label htmlFor="inputShopLogoImageFile" className="form-element">Shop Logo</label><br/>
                    <S3Uploader
                        onUploadStart={this.imageUploadStarted.bind(this)}
                        onUploadFinish={this.imageUploadComplete.bind(this)}
                        folderURL={logoFolderURL}/>
                    <label htmlFor="inputShopLogoBackground" className="form-element">Shop Logo Background Color (Hex Value)</label>
                    <Input type="ShopLogoBackground" ref='backgroundColorBox' placeholder="Hex Value ex #000000..." />
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