import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { unboundAddProduct } from '~/src/actions/products';
import { filter, cloneDeep, forEach, pull } from 'lodash';
import ColorPick from '~/src/components/utility/ColorPick';
import S3Uploader from '~/src/components/utility/S3Uploader';
import { productFolderURL } from '~/src/config';
import '~/src/styles/product.css';



class Add extends Component {

  clickedAddProduct() {


    var shortCircuit = 0;

    var prodName = this.refs.nameBox.getValue().trim();

    if (prodName == "") {
      this.handleAlertNoNameShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoNameDismiss();
    }

    var prodSKU = this.refs.SKUBox.getValue();

    if (prodSKU == "") {
      this.handleAlertNoSKUShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoSKUDismiss();
    }

    var descriptionInput = this.state.description;

    if (descriptionInput == "" || !descriptionInput) {
      this.handleAlertNoDescShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoDescDismiss();
    }

    var priceValue = this.refs.priceBox.getValue();

    if (Number(priceValue) != priceValue) {
      this.handleAlertShow();
      return;
    } else {
      this.handleAlertDismiss();
    }

    if (priceValue == "") {
      this.handleAlertNoPriceShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoPriceDismiss();
    }

    if (this.state.imageFiles.length < 1) {
      this.handleAlertNoImageShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoImageDismiss();
    }

    if (shortCircuit == 1) {
      return;
    }


    var currentColorOptions = _.cloneDeep(this.state.colorOptions);

    _.forEach(currentColorOptions, function(item) {
      item.pop();
    })

    var currentSizeOptions = _.cloneDeep(this.state.sizeOptions);
    var submitSizes = [];

    _.forEach(currentSizeOptions, function(item) {
      submitSizes.push(item[0]);
    })

    var addObject = {
      name: prodName,

      sku: prodSKU,
      description: descriptionInput,
      price: priceValue,
      shop: this.props.shopID,
      colors: currentColorOptions,
      images: this.state.imageFiles,
      sizes: submitSizes
    }

    for (var key in addObject) {
      if (key === 'images' && addObject[key] == "") {
        addObject[key] = [];
      } else if (key === 'sizes' && addObject[key] == "") {
        addObject[key] = [];
      } else if (key === 'colors') {


        if (addObject[key].length == 1 && addObject[key][0][0] == "" && addObject[key][0][1] == "") {
          addObject[key] = [];
        } else {
          _.forEach(addObject[key], function(item) {
            if (item[0] == "") {
              item[0] = " "
            }
            if (item[1] == "") {
              item[1] = " "
            }
          })
        }


      } else if (addObject[key] == "") {
        addObject[key] = " ";
      }
    }

    this.props.boundAddProduct(addObject);

    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.priceBox.getInputDOMNode().value = '';
    this.handleAlertDismiss();
    this.handleAlertNoNameDismiss();
    this.handleAlertNoSKUDismiss();
    this.handleAlertNoDescDismiss();
    this.handleAlertNoPriceDismiss();
    this.handleAlertNoImageDismiss();
    this.setState({
      showModal: false,
      images: [0],
      submitDisabled: false,
      imageFiles: [],
      sizeOptions: [["", Math.random()]],
      colorOptions: [["", "", Math.random()]],
      description: undefined,
      disabled: []
    });
    this.props.onClose();
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.visible,
      images: [0],
      submitDisabled: false,
      imageFiles: [],
      nameValue: undefined,
      sizeOptions: [["", Math.random()]],
      colorOptions: [["", "", Math.random()]],
      alertVisible: false,
      description: undefined,
      disabled: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible != this.props.visible && nextProps.visible == true && this.state.showModal != true) {
      this.setState({
        showModal: true,
      });
    } else {
      return;
    }
  }


  handleAlertDismiss() {
    this.setState({
      alertVisible: false
    });
  }

  handleAlertShow() {
    this.setState({
      alertVisible: true
    });
  }

  onDescriptionBoxChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  close() {
    this.handleAlertDismiss();
    this.handleAlertNoNameDismiss();
    this.handleAlertNoSKUDismiss();
    this.handleAlertNoDescDismiss();
    this.handleAlertNoPriceDismiss();
    this.handleAlertNoImageDismiss();
    this.setState({
      showModal: false,
      submitDisabled: false,
      images: [0],
      imageFiles: [],
      sizeOptions: [["", Math.random()]],
      colorOptions: [["", "", Math.random()]],
      description: undefined,
      disabled: []
    });
    this.props.onClose();
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  clickedAddColor(color) {
    if (color[0] == "" && color[1] == "") {
      return;
    }

    var updateProductColors = _.cloneDeep(this.state.colorOptions);

    updateProductColors.push(["", "", Math.random()]);

    this.setState({
      colorOptions: updateProductColors
    });
  }

  clickedAddSize(size) {
    if (size[0] == "") {
      return;
    }

    var updateProductSizes = _.cloneDeep(this.state.sizeOptions);

    updateProductSizes.push(["", Math.random()]);

    this.setState({
      sizeOptions: updateProductSizes
    });
  }

  clickedDeleteSize(size) {

    if (this.state.sizeOptions.length == 1) {

      updateProduct = [["", Math.random()]];

      this.setState({
        sizeOptions: updateProduct
      });

      return;
    }

    var updateProductSizes = _.cloneDeep(this.state.sizeOptions);

    var sizeIndex = _.findIndex(updateProductSizes, function(o) {
      return o[0] == size[0];
    });

    _.pullAt(updateProductSizes, sizeIndex);

    this.setState({
      sizeOptions: updateProductSizes
    });

  }

  clickedAddImage() {
    var currentvalue = this.state.images[this.state.images.length - 1];
    var newimage = this.state.images.concat(currentvalue + 1);
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

    var newimage = _.filter(this.state.images, function(o) {
      return o != lineToRemove;
    })

    this.setState({
      images: newimage
    });
  }

  imageUploadStarted() {
    this.setState({
      submitDisabled: true
    });
  }

  imageUploadComplete(index, imageFile) {
    var currentDisabled = _.cloneDeep(this.state.disabled);
    currentDisabled[index] = true;
    var imageFileName = imageFile;
    var images = _.cloneDeep(this.state.imageFiles);
    images.push(imageFileName);
    this.setState({
      submitDisabled: false,
      imageFiles: images,
      disabled: currentDisabled
    });
  }

  onNameBoxChange(event) {
    let value = event.target.value;
    this.setState({
      nameValue: value
    });
  }

  onaSizeBoxChange(item, event) {
    var currentSizeOptions = _.cloneDeep(this.state.sizeOptions);
    currentSizeOptions[item][0] = event.target.value;
    this.setState({
      sizeOptions: currentSizeOptions
    });
  }

  onaColorBoxChange(item, event) {
    var currentColorOptions = _.cloneDeep(this.state.colorOptions);



    for (var key in this.refs) {
      if (key.startsWith("colorHexBox")) {
        var hexval = this.refs[key].refs.input.value;
        var hexind = key.slice(-1);
        hexind = parseInt(hexind);
        if (currentColorOptions[hexind] == undefined) {
          currentColorOptions[hexind] = ["", "", Math.random()];
        }
        ;
        currentColorOptions[hexind][1] = hexval;

      } else if (key.startsWith("colorNameBox")) {
        var nameval = this.refs[key].refs.input.value;
        var nameind = key.slice(-1);
        nameind = parseInt(nameind);
        if (currentColorOptions[nameind] == undefined) {
          currentColorOptions[nameind] = ["", "", Math.random()];
        }
        ;
        currentColorOptions[nameind][0] = nameval;
      }
    }
    ;

    _(currentColorOptions).forEach((o) => {
      if (o[0] == "") {
        o[0] = undefined;
      }
      if (o[1] == "") {
        o[1] = undefined;
      }
    });

    this.setState({
      colorOptions: currentColorOptions
    });

  }

  handleChangeComplete(index, color) {

    var refstring = 'colorHexBox' + String(index);
    var refstring2 = 'colorDisplayBox' + String(index);

    this.refs[refstring].refs.input.value = color.hex;

    this.refs[refstring2].style.backgroundColor = color.hex;
    this.refs[refstring2].style.height = '30px';
    this.refs[refstring2].style.width = '30px';
    this.refs[refstring2].style.borderRadius = '20px';
  }

  handleColorClose(index) {
    this.onaColorBoxChange(index);
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

  handleAlertNoSKUDismiss() {
    this.setState({
      alertNoSKUVisible: false
    });
  }

  handleAlertNoSKUShow() {
    this.setState({
      alertNoSKUVisible: true
    });
  }

  handleAlertNoDescDismiss() {
    this.setState({
      alertNoDescVisible: false
    });
  }

  handleAlertNoDescShow() {
    this.setState({
      alertNoDescVisible: true
    });
  }

  handleAlertNoPriceDismiss() {
    this.setState({
      alertNoPriceVisible: false
    });
  }

  handleAlertNoPriceShow() {
    this.setState({
      alertNoPriceVisible: true
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

  clickedDeleteImage(index) {

    var currentDisabled = _.cloneDeep(this.state.disabled);
    currentDisabled[index] = false;

    var refName = "imageBox" + index

    var imageFileName = this.refs[refName].state.uploadFileURL;
    var images = _.cloneDeep(this.state.imageFiles);
    _.pull(images, imageFileName);

    this.setState({
      imageFiles: images,
      disabled: currentDisabled
    });
  }

  clickedDeleteColor(color, index) {

    if (this.state.colorOptions.length == 1) {
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

    var updateProductColors = _.cloneDeep(this.state.colorOptions);

    var colorIndex = _.findIndex(updateProductColors, function(o) {
      return o[0] == color[0] && o[1] == color[1];
    });

    _.pullAt(updateProductColors, colorIndex);


    this.setState({
      colorOptions: updateProductColors
    });
  }

  render() {
    var colorLength = this.state.colorOptions.length;
    var sizeLength = this.state.sizeOptions.length;
    var imageLength = this.state.images.length;
    return (
      <div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) } backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              Add a new Product:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input label="Name" type="text" ref='nameBox' placeholder="Name..." required />
            { this.state.alertNoNameVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
                <p>
                  Product name is required.
                </p>
              </Alert> : null }
            <Input label="SKU" type="text" ref='SKUBox' placeholder="SKU..." />
            { this.state.alertNoSKUVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoSKUDismiss.bind(this) }>
                <p>
                  Product SKU is required.
                </p>
              </Alert> : null }
            <label htmlFor="inputProductDescription">
              Description
            </label>
            <textarea id="inputProductDescription" className="form-control" ref='descriptionBox' onChange={ this.onDescriptionBoxChange.bind(this) } placeholder="Description..." />
            { this.state.alertNoDescVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoDescDismiss.bind(this) }>
                <p>
                  Product description is required.
                </p>
              </Alert> : null }
            <Input label="Price" type="number" ref='priceBox' placeholder="Price (Only decimal numbers)..." />
            { this.state.alertVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertDismiss.bind(this) }>
                <p>
                  Product price can only be a decimal number example 1 50 50.00 65.89 etc.
                </p>
              </Alert> : null }
            { this.state.alertNoPriceVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoPriceDismiss.bind(this) }>
                <p>
                  Product price is required.
                </p>
              </Alert> : null }
            <label htmlFor="inputProductColor">
              Color(s)
            </label>
            <Grid fluid>
              { this.state.colorOptions.map((color, index) => <Row key={ color[2] } className="padded-row">
                                                                <Col xs={ 3 } md={ 3 }>
                                                                <ColorPick handleChange={ this.handleChangeComplete.bind(this, index) } onClosing={ this.handleColorClose.bind(this, index) } />
                                                                </Col>
                                                                <Col xs={ 5 } md={ 3 }>
                                                                <Input className="color-box" type="text" ref={ 'colorNameBox' + index } onChange={ this.onaColorBoxChange.bind(this, index) } placeholder="Name..." />
                                                                </Col>
                                                                <Col xs={ 1 } md={ 1 }>
                                                                <div ref={ 'colorDisplayBox' + index }>
                                                                </div>
                                                                </Col>
                                                                <Col xs={ 5 } md={ 3 }>
                                                                <Input type="text" ref={ 'colorHexBox' + index } onChange={ this.onaColorBoxChange.bind(this, index) } readOnly placeholder="Hex Value" />
                                                                </Col>
                                                                <Col xs={ 1 } md={ 1 }>
                                                                <div>
                                                                  <Button bsStyle="danger" onClick={ this.clickedDeleteColor.bind(this, color, index) }>
                                                                    <b>‒</b>
                                                                  </Button>
                                                                </div>
                                                                </Col>
                                                                { index == colorLength - 1 ?
                                                                  <div>
                                                                    <Col xs={ 1 } md={ 1 }>
                                                                    <div>
                                                                      <Button bsStyle="success" onClick={ this.clickedAddColor.bind(this, color) }>
                                                                        <b>+</b>
                                                                      </Button>
                                                                    </div>
                                                                    </Col>
                                                                  </div>
                                                                  : null }
                                                              </Row>
                ) }
            </Grid>
            <label htmlFor="inputProductSize">
              Size(s)
            </label>
            <Grid fluid ref='sizeBox'>
              { this.state.sizeOptions.map((size, index) => <Row key={ size[1] } className="padded-row">
                                                              <Col xs={ 5 } md={ 3 }>
                                                              <Input id="inputProductSize" className="size-box" type="text" onChange={ this.onaSizeBoxChange.bind(this, index) } ref={ 'sizeBox' + index } placeholder="Size..." />
                                                              </Col>
                                                              <Col xs={ 1 } md={ 1 }>
                                                              <div>
                                                                <Button bsStyle="danger" onClick={ this.clickedDeleteSize.bind(this, size) }>
                                                                  <b>‒</b>
                                                                </Button>
                                                              </div>
                                                              </Col>
                                                              { index == sizeLength - 1 ?
                                                                <div key={ index }>
                                                                  <Col xs={ 1 } md={ 1 }>
                                                                  <div>
                                                                    <Button bsStyle="success" onClick={ this.clickedAddSize.bind(this, size) }>
                                                                      <b>+</b>
                                                                    </Button>
                                                                  </div>
                                                                  </Col>
                                                                </div>
                                                                : null }
                                                            </Row>
                ) }
            </Grid>
            <label htmlFor="inputProductImage">
              Image(s)
            </label>
            <Grid fluid>
              { this.state.images.map((item, index) => <div>
                                                         <Row className="padded-row">
                                                           <Col>
                                                           <S3Uploader ref={ 'imageBox' + item } reset={ !this.state.disabled[index] } onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this, index) } folderURL={ productFolderURL }
                                                           />
                                                           </Col>
                                                           <Col xs={ 1 } md={ 1 }>
                                                           <div>
                                                             <Button bsStyle="danger" className="remove-button" onClick={ this.clickedDeleteImage.bind(this, index) } disabled={ !this.state.disabled[index] }>
                                                               { !this.state.disabled[index] ? null : 'Change Image' }
                                                             </Button>
                                                           </div>
                                                           </Col>
                                                         </Row>
                                                       </div>
                ) }
              { this.state.alertNoImageVisible ?
                <Alert bsStyle="danger" onDismiss={ this.handleAlertNoImageDismiss.bind(this) }>
                  <p>
                    At least one image is required.
                  </p>
                </Alert> : null }
              <Row className="padded-row">
                <Col xs={ 1 } md={ 1 }>
                <div>
                  <Button bsStyle="success" onClick={ this.clickedAddImage.bind(this) }>
                    Add another image.
                  </Button>
                </div>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" bsStyle="primary" onClick={ this.clickedAddProduct.bind(this) } disabled={ this.state.submitDisabled }>
              { this.state.submitDisabled ? 'Wait for upload to finish' : 'Add product' }
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {};
}
;

function mapDispatchToProps(dispatch) {
  return {
    boundAddProduct: bindActionCreators(unboundAddProduct, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(Add);
