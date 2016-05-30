import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { unboundAddProduct } from '~/src/actions/products';
import { filter, cloneDeep } from 'lodash';
import S3Uploader from '~/src/components/utility/S3Uploader';
import { productFolderURL } from '~/src/config';
import '~/src/styles/product.css';


class Add extends Component {

  clickedAddProduct() {


    var addObject = {
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      description: this.refs.descriptionBox.getValue(),
      price: this.refs.priceBox.getValue(),
      shop: this.props.data,
      colors: this.state.colorOptions,
      images: this.state.imageFiles,
      sizes: this.state.sizeOptions
    }

    this.props.boundAddProduct(addObject);

    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.keyBox.getInputDOMNode().value = '';
    this.refs.descriptionBox.getInputDOMNode().value = '';
    this.refs.priceBox.getInputDOMNode().value = '';
    this.setState({ 
      showModal: false,
      colors: [0],
      sizes: [0],
      images: [0],
      imageFiles: [],
      sizeOptions: [],
      colorOptions: []
       });

  }

    constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      colors: [0],
      sizes: [0],
      images: [0],
      submitDisabled: false,
      imageFiles: [],
      nameValue:undefined,
      sizeOptions: [],
      colorOptions: []
    };
  }

  close() {
    this.setState({ 
      showModal: false,
      colors: [0],
      sizes: [0],
      images: [0],
      imageFiles: [],
      sizeOptions: [],
      colorOptions: [] });
  }

  open() {
    this.setState({ showModal: true });
  }

  clickedAddColor() {
    var currentvalue = this.state.colors[this.state.colors.length - 1];
    var newcolor = this.state.colors.concat( currentvalue + 1 );
    this.setState({
      colors: newcolor
    });
  }

  clickedRemoveColor(event) {

    if (this.state.colors.length == 1) {
      return
    }

    var lineToRemove = event.currentTarget.value;

    var newcolor = _.filter(this.state.colors, function(o){return o != lineToRemove;})

    this.setState({
      colors: newcolor
    });
  }

  clickedAddSize() {
    var currentvalue = this.state.sizes[this.state.sizes.length - 1];
    var newsize = this.state.sizes.concat( currentvalue + 1 );
    this.setState({
      sizes: newsize
    });
  }

  clickedRemoveSize(event) {


    if (this.state.sizes.length == 1) {
      return
    }

    var lineToRemove = event.currentTarget.value;

    var newsize = _.filter(this.state.sizes, function(o){return o != lineToRemove;})

    this.setState({
      sizes: newsize
    });
  }


  clickedAddImage() {
    var currentvalue = this.state.images[this.state.images.length - 1];
    var newimage = this.state.images.concat( currentvalue + 1 );
    this.setState({
      images: newimage
    });
  }

  clickedRemoveImage(event) {

    if (this.state.images.length == 1) {
      return
    }

    // var lineToRemove = event.currentTarget.value;
    var lineToRemove = this.state.images[this.state.images.length - 1];

    var newimage = _.filter(this.state.images, function(o){return o != lineToRemove;})

    this.setState({
      images: newimage
    });
  }

    imageUploadStarted(){
    this.setState({ submitDisabled: true });
  }

  imageUploadComplete(imageFile){
    var imageFileName = imageFile;
    var images = _.cloneDeep(this.state.imageFiles);
    images.push(imageFileName);
    this.setState({ submitDisabled: false, imageFiles: images });
  }

  onNameBoxChange(event) {
    let value = event.target.value;
    this.setState({ nameValue: value  });
  }

  onaSizeBoxChange(item, event){
    var currentSizeOptions = _.cloneDeep(this.state.sizeOptions);
    currentSizeOptions[item] = event.target.value;
    this.setState({ sizeOptions: currentSizeOptions });
  }

  onaColorBoxChange(item, event) {
    var currentColorOptions = _.cloneDeep(this.state.colorOptions);



    for (var key in this.refs) {
      if (key.startsWith("colorHexBox")) {
        var hexval = this.refs[key].refs.input.value;
        var hexind = key.slice(-1);
        hexind = parseInt(hexind);
        if (currentColorOptions[hexind] == undefined) { currentColorOptions[hexind] = []; };
        currentColorOptions[hexind][1] = hexval;

      }
      else if (key.startsWith("colorNameBox")) {
        var nameval = this.refs[key].refs.input.value;
        var nameind = key.slice(-1);
        nameind = parseInt(nameind);
        if (currentColorOptions[nameind] == undefined) { currentColorOptions[nameind] = []; };
        currentColorOptions[nameind][0] = nameval;
      }
    };

     this.setState({ colorOptions: currentColorOptions });

  }


  render() {
    var colorLength = this.state.colors.length;
    var sizeLength = this.state.sizes.length;
    var imageLength = this.state.images.length;
    return (
<div>
    <div className="product-button">
        <Button             
            bsStyle="primary"
            bsSize="large"
            onClick={this.open.bind(this)}
            >
        Add a new product
        </Button>
    </div>
    <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
            <Modal.Title>Add a new Product:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label htmlFor="inputProductName">Product Name</label>
            <Input type="ProductName" ref='nameBox'  placeholder="Name..." required />
            <label htmlFor="inputProductKey">Product Key</label>
            <Input type="ProductKey" ref='keyBox' placeholder="Key..." />
            <label htmlFor="inputProductDescription">Product Description</label>
            <Input type="ProductDescription" ref='descriptionBox' placeholder="Description..." />
            <label htmlFor="inputProductPrice">Product Price</label>
            <Input type="ProductPrice" ref='priceBox' placeholder="Price..." />
            <label htmlFor="inputProductColor">Product Color</label>
            <Grid fluid>
                {this.state.colors.map((item, index) => 
                <Row className="padded-row">
                    <Col xs={5} md={3}>
                    <Input className="color-box" type="productColorName" ref={'colorNameBox'+item} onChange={this.onaColorBoxChange.bind(this)}  placeholder="Name..." />
                    </Col>
                    <Col xs={5} md={3}>
                    <Input type="productColorHex" ref={'colorHexBox'+item} onChange={this.onaColorBoxChange.bind(this)}  placeholder="Hex value..."  />
                    </Col>
                    { index==colorLength-1 ?
                    <div  key={index}>
                        <Col xs={1} md={1}>
                        <div>
                            <OverlayTrigger overlay={
                            <Tooltip id="add-color" >Add another color.</Tooltip>
                            }>
                            <Button bsStyle="success" onClick = {this.clickedAddColor.bind(this)}><b>+</b></Button>
                            </OverlayTrigger>
                        </div>
                        </Col> 
                    </div>
                    : null}
                </Row>
                )}
            </Grid>
            <label htmlFor="inputProductSize">Product Size</label>
            <Grid fluid ref='sizeBox'>
                {this.state.sizes.map((item, index) => 
                <Row className="padded-row">
                    <Col xs={5} md={3}>
                    <Input className="size-box" type="productSize" onChange={this.onaSizeBoxChange.bind(this, index)} ref={'sizeBox'+item} placeholder="Size..." />
                    </Col>
                    { index==sizeLength-1 ?
                    <div  key={index}>
                        <Col xs={1} md={1}>
                        <div>
                            <OverlayTrigger overlay={
                            <Tooltip id="add-size">Add another size.</Tooltip>
                            }>
                            <Button bsStyle="success" onClick={this.clickedAddSize.bind(this)}><b>+</b></Button>
                            </OverlayTrigger>
                        </div>
                        </Col>
                    </div>
                    : null}
                </Row>
                )}
            </Grid>
            <label htmlFor="inputProductImage">Product Image</label>
            <Grid fluid>
                <Row className="padded-row">
                    <Col xs={1} md={1}>
                    <div>
                        <OverlayTrigger overlay={
                        <Tooltip id="add-image">Add another image.</Tooltip>
                        }>
                        <Button bsStyle="success" onClick={this.clickedAddImage.bind(this)}><b>+</b></Button>
                        </OverlayTrigger>
                    </div>
                    </Col>
                </Row>
                {this.state.images.map((item, index) => 
                <div>
                    <Row className="padded-row">
                        <Col >
                        <S3Uploader ref={'imageBox'+item}
                            onUploadStart={this.imageUploadStarted.bind(this)}
                            onUploadFinish={this.imageUploadComplete.bind(this)}
                            folderURL={productFolderURL}/>
                        </Col>
                    </Row>
                </div>
                )}
            </Grid>
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" bsStyle="primary" onClick = {this.clickedAddProduct.bind(this)} disabled={this.state.submitDisabled}>
            {this.state.submitDisabled? 'Wait for upload to finish' : 'Add product'}
            </Button>
        </Modal.Footer>
    </Modal>
</div>
    );
  }
}

function mapStateToProps(state) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddProduct: bindActionCreators(unboundAddProduct, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Add);
