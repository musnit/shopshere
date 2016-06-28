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

    var prodName = this.refs.nameBox.getValue();

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

    var addObject = {
      name: prodName,

      sku: prodSKU,
      description: descriptionInput,
      price: priceValue,
      shop: this.props.shopID,
      colors: this.state.colorOptions,
      images: this.state.imageFiles,
      sizes: this.state.sizeOptions
    }

    for (var key in addObject) {
      if (key === 'images' && addObject[key] == "") {
        addObject[key] = [];
      } else if (key === 'sizes' && addObject[key] == "") {
        addObject[key] = [];
      } else if (key === 'colors' && addObject[key] == "") {
        addObject[key] = [];
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
      colors: [0],
      sizes: [0],
      images: [0],
      submitDisabled: false,
      imageFiles: [],
      sizeOptions: [],
      colorOptions: [],
      description: undefined,
      disabled: []
    });
    this.props.onClose();
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.visible,
      colors: [0],
      sizes: [0],
      images: [0],
      submitDisabled: false,
      imageFiles: [],
      nameValue: undefined,
      sizeOptions: [],
      colorOptions: [],
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
      colors: [0],
      sizes: [0],
      images: [0],
      imageFiles: [],
      sizeOptions: [],
      colorOptions: [],
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

  clickedAddColor() {
    var currentvalue = this.state.colors[this.state.colors.length - 1];
    var newcolor = this.state.colors.concat(currentvalue + 1);
    this.setState({
      colors: newcolor
    });
  }

  clickedRemoveColor(event) {

    if (this.state.colors.length == 1) {
      return
    }

    var lineToRemove = event.currentTarget.value;

    var newcolor = _.filter(this.state.colors, function(o) {
      return o != lineToRemove;
    })

    this.setState({
      colors: newcolor
    });
  }

  clickedAddSize() {
    var currentvalue = this.state.sizes[this.state.sizes.length - 1];
    var newsize = this.state.sizes.concat(currentvalue + 1);
    this.setState({
      sizes: newsize
    });
  }

  clickedRemoveSize(event) {


    if (this.state.sizes.length == 1) {
      return
    }

    var lineToRemove = event.currentTarget.value;

    var newsize = _.filter(this.state.sizes, function(o) {
      return o != lineToRemove;
    })

    this.setState({
      sizes: newsize
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
    currentSizeOptions[item] = event.target.value;
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
          currentColorOptions[hexind] = [];
        }
        ;
        currentColorOptions[hexind][1] = hexval;

      } else if (key.startsWith("colorNameBox")) {
        var nameval = this.refs[key].refs.input.value;
        var nameind = key.slice(-1);
        nameind = parseInt(nameind);
        if (currentColorOptions[nameind] == undefined) {
          currentColorOptions[nameind] = [];
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

  handleChangeComplete(color, index) {
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

  render() {
    var colorLength = this.state.colors.length;
    var sizeLength = this.state.sizes.length;
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
              { this.state.colors.map((item, index) => <Row className="padded-row">
                                                         <Col xs={ 3 } md={ 3 }>
                                                         <Input className="color-box" type="text" ref={ 'colorNameBox' + item } onChange={ this.onaColorBoxChange.bind(this) } placeholder="Name..." />
                                                         </Col>
                                                         <Col xs={ 3 } md={ 3 }>
                                                         <ColorPick handleChange={ this.handleChangeComplete.bind(this) } onClosing={ this.handleColorClose.bind(this) } index={ item } />
                                                         </Col>
                                                         <Col xs={ 1 } md={ 1 }>
                                                         <div ref={ 'colorDisplayBox' + item }>
                                                         </div>
                                                         </Col>
                                                         <Col xs={ 3 } md={ 3 }>
                                                         <Input type="text" ref={ 'colorHexBox' + item } onChange={ this.onaColorBoxChange.bind(this) } readOnly placeholder="Hex Value" />
                                                         </Col>
                                                         { index == colorLength - 1 ?
                                                           <div key={ index }>
                                                             <Col xs={ 1 } md={ 1 }>
                                                             <div>
                                                               <OverlayTrigger overlay={ <Tooltip id="add-color">
                                                                                           Add another color.
                                                                                         </Tooltip> }>
                                                                 <Button bsStyle="success" onClick={ this.clickedAddColor.bind(this) }>
                                                                   <b>+</b>
                                                                 </Button>
                                                               </OverlayTrigger>
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
              { this.state.sizes.map((item, index) => <Row className="padded-row">
                                                        <Col xs={ 5 } md={ 3 }>
                                                        <Input id="inputProductSize" className="size-box" type="text" onChange={ this.onaSizeBoxChange.bind(this, index) } ref={ 'sizeBox' + item } placeholder="Size..." />
                                                        </Col>
                                                        { index == sizeLength - 1 ?
                                                          <div key={ index }>
                                                            <Col xs={ 1 } md={ 1 }>
                                                            <div>
                                                              <OverlayTrigger overlay={ <Tooltip id="add-size">
                                                                                          Add another size.
                                                                                        </Tooltip> }>
                                                                <Button bsStyle="success" onClick={ this.clickedAddSize.bind(this) }>
                                                                  <b>+</b>
                                                                </Button>
                                                              </OverlayTrigger>
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
