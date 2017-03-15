import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts, unboundPatchProduct, deleteProduct } from '~/src/actions/products';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image, Alert } from 'react-bootstrap';
import { find, findIndex, forEach, pull, pullAt } from 'lodash';
import ColorPick from '~/src/components/utility/ColorPick';
import S3Uploader from '~/src/components/utility/S3Uploader';
import { productFolderURL } from '~/src/config';
import Confirm from '~/src/components/utility/Confirm';
import Add from '~/src/components/products/Add';
import '~/src/styles/product.css';


class List extends Component {

  componentWillUnmount() {
    this.props.clearProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shopID !== this.props.shopID) {
      this.props.clearProducts();
      this.props.fetchProducts({
        shopID: nextProps.shopID
      });
    }
  }

  clickedPatchProduct() {

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


    var imageObjects = this.state.selectedProduct.images.concat(this.state.imageFiles);
    if (imageObjects.length < 1) {
      this.handleAlertNoImageShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoImageDismiss();
    }


    if (shortCircuit == 1) {
      return;
    }


    var currentColorOptions = _.cloneDeep(this.state.selectedProduct.colors);

    _.forEach(currentColorOptions, function(item) {
      item.pop();
    })
    var currentSizeOptions = _.cloneDeep(this.state.selectedProduct.sizes);
    var submitSizes = [];

    _.forEach(currentSizeOptions, function(item) {
      submitSizes.push(item[0]);
    })

    var patchObject = {
      id: this.state.selectedProduct.id,
      name: prodName,
      sku: prodSKU,
      description: descriptionInput,
      price: priceValue,
      shop: this.props.shopID,
      colors: currentColorOptions,
      images: imageObjects,
      sizes: submitSizes
    }

    for (var key in patchObject) {
      if (key === 'images' && patchObject[key] == "") {
        patchObject[key] = [];
      } else if (key === 'sizes' && patchObject[key] == "") {
        patchObject[key] = [];
      } else if (key === 'sizes' && patchObject[key].length > 1 && patchObject[key].indexOf("") != -1) {

            patchObject[key].splice(patchObject[key].indexOf(""), 1);

      }
      else if (key === 'colors') {

        if (patchObject[key].length == 1 && patchObject[key][0][0] == "" && patchObject[key][0][1] == "") {
          patchObject[key] = [];
        } else if (patchObject[key].length > 1 ) {
          _.forEach(patchObject[key], function(item) {
            if (item[0] == "" && item[1] == "") {
              patchObject[key].splice(patchObject[key].indexOf(item), 1);
            }
          })
        }

        else {
          _.forEach(patchObject[key], function(item) {
            if (item[0] == "") {
              item[0] = " "
            }
            if (item[1] == "") {
              item[1] = " "
            }
          })
        }

      } else if (patchObject[key] == "") {
        patchObject[key] = " ";
      }
    }
    this.props.boundPatchProduct(patchObject);

    this.refs.priceBox.getInputDOMNode().value = '';
    this.handleAlertDismiss();
    this.handleAlertNoNameDismiss();
    this.handleAlertNoSKUDismiss();
    this.handleAlertNoDescDismiss();
    this.handleAlertNoPriceDismiss();
    this.handleAlertNoImageDismiss();
    this.setState({
      showModal: false,
      colorOptions: [],
      submitDisabled: false,
      imageFiles: [],
      images: [0],
      description: undefined
    });
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


  clickedDeleteProduct() {
    this.setState({
      confirmModalVisible: true,
    });
  }

  closeConfirm() {
    this.setState({
      confirmModalVisible: false,
    });
  }

  confirmDeleteProduct() {

    let deleteObject = {
      ID: this.state.selectedProduct.id,
      index: this.state.selectedProduct.index
    };

    this.props.deleteProduct(deleteObject);

    this.setState({
      showModal: false,
      selectedProduct: {
        colors: [],
        sizes: [],
        images: []
      },
      imageFiles: [],
      submitDisabled: false,
      images: [0],
      description: undefined,
      confirmModalVisible: false
    });
  }


  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedProduct: {
        colors: [],
        sizes: [],
        images: []
      },
      colorOptions: [],
      submitDisabled: false,
      imageFiles: [],
      images: [0],
      alertVisible: false,
      description: undefined,
      confirmModalVisible: false,
      productAddVisible: false
    };
  }

  close() {
    this.setState({
      showModal: false,
      selectedProduct: {
        colors: [],
        sizes: [],
        images: []
      },
      colorOptions: [],
      submitDisabled: false,
      imageFiles: [],
      images: [0],
      alertVisible: false,
      description: undefined
    });
    this.handleAlertDismiss();
    this.handleAlertNoNameDismiss();
    this.handleAlertNoSKUDismiss();
    this.handleAlertNoDescDismiss();
    this.handleAlertNoPriceDismiss();
    this.handleAlertNoImageDismiss();
  }

  open(name) {
    let selected = _.find(this.props.products, function(o) {
      return o.id == name.currentTarget.lastChild.innerText
    });
    let index = _.findIndex(this.props.products, function(o) {
      return o.id == name.currentTarget.lastChild.innerText
    });

    selected.index = index

    if (!selected.colors || selected.colors.length === 0) {
      selected.colors = [[[], []]];
    }
    if (!selected.sizes || selected.sizes.length === 0) {
      selected.sizes = [""];
    }
    if (!selected.images || selected.images.length === 0) {
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

    _.forEach(selected.colors, function(item) {
      if (item[0] == " ") {
        item[0] = ""
      }
      if (item[1] == " ") {
        item[1] = ""
      }
      item[2] = Math.random();
    })

    _.forEach(selected.sizes, function(item, index) {
      console.log(index);
      if (item == " ") {
        item = ""
      }
      if (typeof item == "string") {
        selected.sizes[index] = [item, Math.random()];
      }

    })

    this.setState({
      showModal: true,
      selectedProduct: selected,
      description: selected.description
    });

  }


  setColorBoxes() {

    var refToThis = this;

    _.forEach(this.state.selectedProduct.colors, function(value, index) {
      var refstring2 = 'colorDisplayBox' + String(index);
      refToThis.refs[refstring2].style.backgroundColor = value[1];
      refToThis.refs[refstring2].style.height = '30px';
      refToThis.refs[refstring2].style.width = '30px';
      refToThis.refs[refstring2].style.borderRadius = '20px';
    });

  }

  onDescriptionBoxChange(event) {
    this.setState({
      description: event.target.value
    });
  }


  onaColorBoxChange(item, event) {

    var currentColorOptions = _.cloneDeep(this.state.selectedProduct);



    for (var key in this.refs) {
      if (key.startsWith("colorHexBox")) {
        var hexval = this.refs[key].refs.input.value;
        var hexind = key.slice(-1);
        hexind = parseInt(hexind);
        if (currentColorOptions.colors[hexind] == undefined) {
          currentColorOptions.colors[hexind] = ["", "", Math.random()];
        }
        ;
        currentColorOptions.colors[hexind][1] = hexval;

      } else if (key.startsWith("colorNameBox")) {
        var nameval = this.refs[key].refs.input.value;
        var nameind = key.slice(-1);
        nameind = parseInt(nameind);
        if (currentColorOptions.colors[nameind] == undefined) {
          currentColorOptions.colors[nameind] = ["", "", Math.random()];
        }
        ;
        currentColorOptions.colors[nameind][0] = nameval;
      }
    }
    ;


    this.setState({
      selectedProduct: currentColorOptions
    });

  }

  onaSizeBoxChange(item, event) {
    var currentSizeOptions = _.cloneDeep(this.state.selectedProduct);
    currentSizeOptions.sizes[item][0] = event.target.value;
    this.setState({
      selectedProduct: currentSizeOptions
    });
  }


  clickedAddColor(color) {
    if (color[0] == "" && color[1] == "") {
      return;
    }
    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.colors.push(["", "", Math.random()]);
    this.setState({
      selectedProduct: updateProduct
    });
  }

  clickedDeleteColor(color, index) {

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

    var updateProduct = _.cloneDeep(this.state.selectedProduct);
    var updateProductColors = _.cloneDeep(updateProduct.colors);

    var colorIndex = _.findIndex(updateProductColors, function(o) {
      return o[0] == color[0] && o[1] == color[1];
    });

    _.pullAt(updateProductColors, colorIndex);

    updateProduct.colors = updateProductColors;

    this.setState({
      selectedProduct: updateProduct
    });
  }

  clickedAddSize(size) {
    if (size[0] == "") {
      return;
    }
    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.sizes.push(["", Math.random()]);
    this.setState({
      selectedProduct: updateProduct
    });
  }

  clickedDeleteSize(size) {

    if (this.state.selectedProduct.sizes.length == 1) {
      var updateProduct = _.cloneDeep(this.state.selectedProduct);

      updateProduct.sizes = [["", Math.random()]];

      this.setState({
        selectedProduct: updateProduct
      });

      return;
    }

    var updateProduct = _.cloneDeep(this.state.selectedProduct);
    var updateProductSizes = _.cloneDeep(updateProduct.sizes);

    var sizeIndex = _.findIndex(updateProductSizes, function(o) {
      return o[0] == size[0];
    });

    _.pullAt(updateProductSizes, sizeIndex);

    updateProduct.sizes = updateProductSizes;

    this.setState({
      selectedProduct: updateProduct
    });

  }

  clickedAddImage() {
    var currentvalue = this.state.images[this.state.images.length - 1];
    var newimage = this.state.images.concat(currentvalue + 1);
    this.setState({
      images: newimage
    });
  }

  clickedDeleteImage(index) {
    var updateProduct = JSON.parse(JSON.stringify(this.state.selectedProduct));
    updateProduct.images.splice(index, 1);
    this.setState({
      selectedProduct: updateProduct
    });
  }

  imageUploadStarted() {
    this.setState({
      submitDisabled: true
    });
  }
  imageUploadComplete(imageFile) {
    var imageFileName = imageFile;
    var images = _.cloneDeep(this.state.imageFiles);
    images.push(imageFileName);
    this.setState({
      submitDisabled: false,
      imageFiles: images
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

  closeProductAddModal() {
    this.setState({
      productAddVisible: false
    });
  }

  openProductAddModal() {
    this.setState({
      productAddVisible: true
    });
  }


  render() {

    var colorLength = this.state.selectedProduct.colors.length;
    var sizeLength = this.state.selectedProduct.sizes.length;
    var imageLength = this.state.selectedProduct.images.length;

    var colorChoices = this.state.selectedProduct.colors;

    return (
      <div className="product-button">
        <DropdownButton bsStyle={ 'info' } title={ 'Select a product to View, Edit or Delete' } id="product-view-edit">
          { this.props.products.map((product, index) => <MenuItem eventKey={ index } key={ index }  onSelect={ this.open.bind(this) }>
                                                        { product.name }<div className="invisible">{product.id}</div>
                                                        </MenuItem>
            ) }
          { this.props.products.length == 0 ?
            <MenuItem onClick={ this.openProductAddModal.bind(this) }> <b>Add a new product...</b> </MenuItem> : null }
        </DropdownButton>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) } onEntered={ this.setColorBoxes.bind(this) } backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              Edit <b>{ this.state.selectedProduct.name }</b> by modifying it below and then click Edit product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input label="Product Name" type="text" ref='nameBox' defaultValue={ this.state.selectedProduct.name } placeholder="Name..." />
            { this.state.alertNoNameVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
                <p>
                  Product name is required.
                </p>
              </Alert> : null }
            <Input label="Product SKU" type="text" ref='SKUBox' defaultValue={ this.state.selectedProduct.sku } placeholder="SKU..." />
            { this.state.alertNoSKUVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoSKUDismiss.bind(this) }>
                <p>
                  Product SKU is required.
                </p>
              </Alert> : null }
            <label htmlFor="inputProductDescription">
              Description
            </label>
            <textarea id="inputProductDescription" className="form-control" ref='descriptionBox' onChange={ this.onDescriptionBoxChange.bind(this) } defaultValue={ this.state.selectedProduct.description } placeholder="Description..."
            />
            { this.state.alertNoDescVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoDescDismiss.bind(this) }>
                <p>
                  Product description is required.
                </p>
              </Alert> : null }
            <Input label="Product Price" type="number" ref='priceBox' defaultValue={ this.state.selectedProduct.price } placeholder="Price (Only decimal numbers)..." />
            { this.state.alertVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertDismiss.bind(this) }>
                <h4>Invalid Input!</h4>
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
              { colorChoices.map((color, index) => <Row key={ color[2] } className="padded-row">
                                                     <Col xs={ 3 } md={ 3 }>
                                                     <ColorPick handleChange={ this.handleChangeComplete.bind(this, index) } onClosing={ this.handleColorClose.bind(this, index) } />
                                                     </Col>
                                                     <Col xs={ 5 } md={ 3 }>
                                                     <Input className="color-box" type="text" ref={ 'colorNameBox' + index } onChange={ this.onaColorBoxChange.bind(this, index) } defaultValue={ color[0] } placeholder="Name..." />
                                                     </Col>
                                                     <Col xs={ 1 } md={ 1 }>
                                                     <div ref={ 'colorDisplayBox' + index }>
                                                     </div>
                                                     </Col>
                                                     <Col xs={ 5 } md={ 3 }>
                                                     <Input type="text" ref={ 'colorHexBox' + index } onChange={ this.onaColorBoxChange.bind(this, index) } readOnly defaultValue={ color[1] } />
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
                                                   </Row>) }
            </Grid>
            <label htmlFor="inputProductSize">
              Size(s)
            </label>
            <Grid fluid ref='sizeBox'>
              { this.state.selectedProduct.sizes.map((size, index) => <Row key={ size[1] } className="padded-row">
                                                                        <Col xs={ 5 } md={ 3 }>
                                                                        <Input id="inputProductSize" className="size-box" type="text" ref={ 'sizeBox' + index } onChange={ this.onaSizeBoxChange.bind(this, index) } defaultValue={ size[0] } placeholder="Size..."
                                                                        />
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
              { this.state.selectedProduct.images.map((image, index) => <div key={ index }>
                                                                          <Row className="padded-row">
                                                                            <Col xs={ 8 } md={ 8 }>
                                                                            <Image src={ image } responsive />
                                                                            </Col>
                                                                            <Col xs={ 1 } md={ 1 }>
                                                                            <div>
                                                                              <OverlayTrigger overlay={ <Tooltip id="remove-image">
                                                                                                          Remove image.
                                                                                                        </Tooltip> }>
                                                                                <Button bsStyle="danger" onClick={ this.clickedDeleteImage.bind(this, index) }>
                                                                                  <b>‒</b>
                                                                                </Button>
                                                                              </OverlayTrigger>
                                                                            </div>
                                                                            </Col>
                                                                          </Row>
                                                                        </div>
                ) }
              { this.state.images.map((item, index) => <Row className="padded-row">
                                                         <Col>
                                                         <S3Uploader ref={ 'imageBox' } onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ productFolderURL } />
                                                         </Col>
                                                       </Row>
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
                  <OverlayTrigger overlay={ <Tooltip id="add-image">
                                              Add another image.
                                            </Tooltip> }>
                    <Button bsStyle="success" onClick={ this.clickedAddImage.bind(this) }>
                      <b>+</b>
                    </Button>
                  </OverlayTrigger>
                </div>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Grid fluid>
              <Row className="padded-row">
                <Col xs={ 6 } md={ 4 }>
                <ButtonInput className="product-button" type="submit" bsStyle="danger" onClick={ this.clickedDeleteProduct.bind(this) }>
                  Delete product
                </ButtonInput>
                </Col>
                <Col xs={ 6 } md={ 4 }>
                <ButtonInput className="product-button" type="submit" bsStyle="primary" onClick={ this.clickedPatchProduct.bind(this) }>
                  Edit product
                </ButtonInput>
                </Col>
              </Row>
            </Grid>
          </Modal.Footer>
        </Modal>
        <Confirm visible={ this.state.confirmModalVisible } onConfirm={ this.confirmDeleteProduct.bind(this) } onClose={ this.closeConfirm.bind(this) } title="Confirmation" body="Are you sure you want to delete this product?"
        />
        <Add shopID={ this.props.shopID } visible={ this.state.productAddVisible } onClose={ this.closeProductAddModal.bind(this) } />
      </div>
      );
  }
}

const FetchedList = fetch(List, {
  actions: [fetchProducts]
});


function mapStateToProps(state) {
  const products = state.products;
  return {
    products
  };
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
