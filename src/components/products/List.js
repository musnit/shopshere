import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts, unboundPatchProduct, deleteProduct } from '~/src/actions/products';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image, Alert} from 'react-bootstrap';
import { find, findIndex, forEach } from 'lodash';
import ColorPick from '~/src/components/utility/ColorPick';
import S3Uploader from '~/src/components/utility/S3Uploader';
import { productFolderURL } from '~/src/config';
import '~/src/styles/product.css';


class List extends Component {

  componentWillUnmount() {
    this.props.clearProducts();
    }

   componentWillReceiveProps(nextProps) {
   if(nextProps.shopID !== this.props.shopID){
    this.props.clearProducts();
    this.props.fetchProducts({shopID: nextProps.shopID});
   }
  }

  clickedPatchProduct() {

    var priceValue = this.refs.priceBox.getValue();

    if (Number(priceValue) != priceValue) {
      this.handleAlertShow();
      return;
    }
    else {
      this.handleAlertDismiss();
    }


    var imageObjects = this.state.selectedProduct.images.concat(this.state.imageFiles);



    var patchObject = {
      id: this.state.selectedProduct.id,
      name: this.refs.nameBox.getValue(),
      sku: this.refs.SKUBox.getValue(),
      description: this.refs.descriptionBox.value,
      price: priceValue,
      shop: this.props.shopID,
      colors: this.state.selectedProduct.colors,
      images: imageObjects,
      sizes: this.state.selectedProduct.sizes
    }

    for(var key in patchObject){
      if (key === 'images' && patchObject[key] == "" ) {
        patchObject[key] = [];
      }
      else if (key === 'sizes' && patchObject[key] == "") {
        patchObject[key] = [];
      }
      else if (key === 'colors') {

        _.forEach(patchObject[key], function(item){
          if (item[0] == ""){
            item[0] = " "
          }
          if (item[1] == ""){
            item[1] = " "
          }
        })
      }
      else if (patchObject[key] == "") {
        patchObject[key] = " ";
      }
    }

    debugger;


    this.props.boundPatchProduct(patchObject);

    this.refs.priceBox.getInputDOMNode().value = '';
    this.handleAlertDismiss();
    this.setState({ 
      showModal: false,
      colorOptions: [],
      submitDisabled: false,
      imageFiles: [],
      images: [0],
      description:undefined });
  }

    handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleAlertShow() {
    this.setState({alertVisible: true});
  }


  clickedDeleteProduct() {

    let deleteObject = {
      ID: this.state.selectedProduct.id,
      index: this.state.selectedProduct.index
    };

    this.props.deleteProduct(deleteObject);

    this.setState({ 
      showModal: false,
      selectedProduct: {colors:[],sizes:[],images:[]},
      imageFiles: [],
      submitDisabled: false,
      images: [0],
      description:undefined
     });
  }


  constructor(props) {
    super(props);
      this.state = {
        showModal: false,
        selectedProduct: {colors:[],sizes:[],images:[]},
        colorOptions: [],
        submitDisabled: false,
        imageFiles: [],
        images: [0],
        alertVisible: false,
        description:undefined
      };
  }

  close() {
    this.setState({ 
      showModal: false,
      selectedProduct: {colors:[],sizes:[],images:[]},
      colorOptions: [],
      submitDisabled: false,
      imageFiles: [],
      images: [0],
      alertVisible: false,
      description:undefined
    });
  }

  open(name) {

    let selected = _.find(this.props.products, function(o) { return o.name == name.target.innerText});
    let index = _.findIndex(this.props.products, function(o) { return o.name == name.target.innerText});

    selected.index = index

    if ( !selected.colors || selected.colors.length === 0  ) {
      selected.colors = [[[],[]]];
    }
    if ( !selected.sizes || selected.sizes.length === 0 ) {
      selected.sizes = [""];
    }
    if ( !selected.images || selected.images.length === 0 ) {
      selected.images = [];
    }

    if (selected.sku == " ") {
      selected.sku = ""
    }
    if (selected.price == " ") {
      selected.price = ""
    }

    if (selected.description == " ") {
      selected.description = ""
    }

    _.forEach(selected.colors, function(item){
          if (item[0] == " "){
            item[0] = ""
          }
          if (item[1] == " "){
            item[1] = ""
          }
        })


    this.setState({ 
      showModal: true ,
      selectedProduct: selected
    });

  }


  setColorBoxes(){


      var refToThis = this;

        _.forEach(this.state.selectedProduct.colors, function(value, index) {
      var refstring2 = 'colorDisplayBox' + String(index);
      refToThis.refs[refstring2].style.backgroundColor = value[1];
      refToThis.refs[refstring2].style.height = '30px';
      refToThis.refs[refstring2].style.width = '30px';
      refToThis.refs[refstring2].style.borderRadius = '20px';
    });

  }

  onDescriptionBoxChange(event){
    this.setState( { description: event.target.value } );
  }


  onaColorBoxChange(item, event) {
    var currentColorOptions = _.cloneDeep(this.state.selectedProduct);



    for (var key in this.refs) {
      if (key.startsWith("colorHexBox")) {
        var hexval = this.refs[key].refs.input.value;
        var hexind = key.slice(-1);
        hexind = parseInt(hexind);
        if (currentColorOptions.colors[hexind] == undefined) { currentColorOptions.colors[hexind] = ["",""]; };
        currentColorOptions.colors[hexind][1] = hexval;

      }
      else if (key.startsWith("colorNameBox")) {
        var nameval = this.refs[key].refs.input.value;
        var nameind = key.slice(-1);
        nameind = parseInt(nameind);
        if (currentColorOptions.colors[nameind] == undefined) { currentColorOptions.colors[nameind] = ["",""]; };
        currentColorOptions.colors[nameind][0] = nameval;
      }
    };


     this.setState({ selectedProduct: currentColorOptions });

  }

  onaSizeBoxChange(item, event){
    var currentSizeOptions = _.cloneDeep(this.state.selectedProduct);
    currentSizeOptions.sizes[item] = event.target.value;
    this.setState({ selectedProduct: currentSizeOptions });
  }


  clickedAddColor(){
    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.colors.push(["",""]);
    this.setState({ selectedProduct: updateProduct });
  }

  clickedDeleteColor(){

    if (this.state.selectedProduct.colors.length == 1) {
      var refstring = 'colorHexBox0';
      var refstring2 = 'colorDisplayBox0';
      var refstring3 = 'colorNameBox0';

      this.refs[refstring].refs.input.value = "";
      this.refs[refstring3].refs.input.value = "";

      this.refs[refstring2].style.backgroundColor = "#fff";
      this.refs[refstring2].style.height = '30px';
      this.refs[refstring2].style.width = '30px';
      this.refs[refstring2].style.borderRadius = '20px';
      this.onaColorBoxChange(0);
      return;
    }

    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.colors.pop();
    this.setState({ selectedProduct: updateProduct });
  }

  clickedAddSize(){
    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.sizes.push("");
    this.setState({ selectedProduct: updateProduct });
  }

  clickedDeleteSize(){

    if (this.state.selectedProduct.sizes.length == 1) {
      return
    }

    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.sizes.pop();
    this.setState({ selectedProduct: updateProduct });

  }

  clickedAddImage(){
    var currentvalue = this.state.images[this.state.images.length - 1];
    var newimage = this.state.images.concat( currentvalue + 1 );
    this.setState({
      images: newimage
    });
  }

  clickedDeleteImage(index){
    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.images.splice(index,1);
    this.setState({ selectedProduct: updateProduct });
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

    handleChangeComplete(color, index) {

    var refstring = 'colorHexBox' + String(index);
    var refstring2 = 'colorDisplayBox' + String(index);

    this.refs[refstring].refs.input.value = color.hex;

    this.refs[refstring2].style.backgroundColor = color.hex;
    this.refs[refstring2].style.height = '30px';
    this.refs[refstring2].style.width = '30px';
    this.refs[refstring2].style.borderRadius = '20px';
  }


  handleColorClose(index){
    this.onaColorBoxChange(index);
  }

  render() {

    var colorLength = this.state.selectedProduct.colors.length;
    var sizeLength = this.state.selectedProduct.sizes.length;
    var imageLength = this.state.selectedProduct.images.length;

    return (
        <div className="product-button">
            <DropdownButton bsStyle={'primary'} title={'Select a product to View, Edit or Delete'} id="product-view-edit">
            {this.props.products.map((product, index) =>
            <MenuItem eventKey={index} key={index} onClick={this.open.bind(this)}> {product.name} </MenuItem>
            )}
            </DropdownButton>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)} onEntered={this.setColorBoxes.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit <b>{this.state.selectedProduct.name}</b> by modifying it below and then click Edit product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input label="Product Name" type="ProductName" ref='nameBox' defaultValue={this.state.selectedProduct.name} placeholder="Name..."  />
                    <Input label="Product SKU" type="ProductSKU" ref='SKUBox' defaultValue={this.state.selectedProduct.sku} placeholder="SKU..." />

                    <label htmlFor="inputProductDescription">Description</label>
                    <textarea className="form-control" type="ProductDescription" ref='descriptionBox' defaultValue={this.state.selectedProduct.description} placeholder="Description..." />

                    <Input label="Product Price" type="ProductPrice" ref='priceBox' defaultValue={this.state.selectedProduct.price}  placeholder="Price (Only decimal numbers)..." />

                                {this.state.alertVisible ? 
                            <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
                              <h4>Invalid Input!</h4>
                              <p>Product price can only be a decimal number example  1  50  50.00  65.89  etc.</p>
                            </Alert> : null}

                    <label htmlFor="inputProductColor">Color(s)</label>
                    <Grid fluid>
                        {this.state.selectedProduct.colors.map((color, index) =>
                        <Row className="padded-row">
                            

                                <Col xs={3} md={3}>

                                  <ColorPick handleChange={this.handleChangeComplete.bind(this)} onClosing={this.handleColorClose.bind(this)} index={index}/>

                                </Col>
                                <Col xs={5} md={3}>
                            <Input className="color-box" type="productColorName" ref={'colorNameBox'+index} onChange={this.onaColorBoxChange.bind(this)} defaultValue={color[0]} placeholder="Name..." />
                            </Col>
                                <Col  xs={1} md={1}>

                                  <div ref={'colorDisplayBox'+index} >

                                  </div>

                                </Col>



                            <Col xs={5} md={3}>
                            <Input type="productColorHex" ref={'colorHexBox'+index} onChange={this.onaColorBoxChange.bind(this)} readOnly  defaultValue={color[1]}  />
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
                                <Col xs={1} md={1}>
                                <div>
                                    <OverlayTrigger overlay={
                                    <Tooltip id="remove-color" >Remove color.</Tooltip>
                                    }>
                                    <Button bsStyle="danger" onClick = {this.clickedDeleteColor.bind(this)}><b>&#8210;</b></Button>
                                    </OverlayTrigger>
                                </div>
                                </Col> 
                            </div>
                            : null}
                        </Row>
                        )}
                    </Grid>
                    <label htmlFor="inputProductSize">Size(s)</label>
                    <Grid fluid ref='sizeBox'>
                        {this.state.selectedProduct.sizes.map((size, index) =>
                        <Row key={index} className="padded-row">
                            <Col xs={5} md={3}>
                            <Input className="size-box" type="productSize" ref={'sizeBox'+index} onChange={this.onaSizeBoxChange.bind(this, index)} defaultValue={size}  placeholder="Size..." />
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
                                <Col xs={1} md={1}>
                                <div>
                                    <OverlayTrigger overlay={
                                    <Tooltip id="remove-size" >Remove size.</Tooltip>
                                    }>
                                    <Button bsStyle="danger" onClick = {this.clickedDeleteSize.bind(this)}><b>&#8210;</b></Button>
                                    </OverlayTrigger>
                                </div>
                                </Col> 
                            </div>
                            : null}
                        </Row>
                        )}
                    </Grid>
                    <label htmlFor="inputProductImage">Image(s)</label>
                    <Grid fluid>
                        {this.state.selectedProduct.images.map((image, index) =>
                        <div key={index}>
                            <Row className="padded-row">
                                <Col xs={8} md={8}>
                                <Image src={image} responsive />
                                </Col>
                                <Col xs={1} md={1}>
                                <div>
                                    <OverlayTrigger overlay={
                                    <Tooltip id="remove-image" >Remove image.</Tooltip>
                                    }>
                                    <Button bsStyle="danger" onClick = {this.clickedDeleteImage.bind(this, index)}><b>&#8210;</b></Button>
                                    </OverlayTrigger>
                                </div>
                                </Col> 
                            </Row>
                        </div>
                        )}
                        {this.state.images.map((item, index) => 
                        <Row className="padded-row">
                            <Col >
                            <S3Uploader ref={'imageBox'}
                                onUploadStart={this.imageUploadStarted.bind(this)}
                                onUploadFinish={this.imageUploadComplete.bind(this)}
                                folderURL={productFolderURL}/>
                            </Col>
                        </Row>
                        )}
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
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Grid fluid>
                        <Row className="padded-row">
                            <Col xs={6} md={4}>
                            <ButtonInput className="product-button" type="submit" bsStyle="danger" onClick = {this.clickedDeleteProduct.bind(this)} >Delete product</ButtonInput>
                            </Col>
                            <Col xs={6} md={4}>
                            <ButtonInput className="product-button" type="submit" bsStyle="primary" onClick = {this.clickedPatchProduct.bind(this)} >Edit product</ButtonInput>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
}

const FetchedList = fetch(List, {
  actions: [fetchProducts]
});


function mapStateToProps(state) {
  const products = state.products;
  return { products };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch),
    clearProducts: bindActionCreators(clearProducts, dispatch),
    boundPatchProduct: bindActionCreators(unboundPatchProduct, dispatch),
    deleteProduct: bindActionCreators(deleteProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedList);