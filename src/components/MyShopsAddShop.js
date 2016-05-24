import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { unboundAddShop } from '~/src/actions/shops';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';

import { find} from 'lodash';

import '~/src/styles/shops.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { logoFolderURL } from '~/src/config';


class MyShopsAddShop extends Component {

  clickedAddShop() {

    var catval = this.refs.catBox.getValue();

    var cat = _.find(this.props.data, function(o) { return o.text == catval});

    var addShopObject = {
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      category: cat["name"],
      logoFile: this.state.logoFile
    }

    this.props.boundAddShop(addShopObject);
    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.keyBox.getInputDOMNode().value = '';
    this.refs.catBox.getInputDOMNode().value = '';
    this.setState({ showModal: false, logoFile: undefined  });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
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

    var categories = this.props.data;

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
          <label htmlFor="inputShopName">Shop Name</label>
          <Input type="ShopName" ref='nameBox' placeholder="Name..." required />
          <label htmlFor="inputShopKey">Shop Key</label>
          <Input type="ShopKey" ref='keyBox' placeholder="Key..." />
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
