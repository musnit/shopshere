import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ProductListItemWrapper from '~/src/components/ProductListItemWrapper';
import { fetchProducts, clearProducts, unboundPatchProduct, deleteProduct } from '~/src/actions/products';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image} from 'react-bootstrap';
import { find, findIndex } from 'lodash';
import S3Uploader from '~/src/components/utility/S3Uploader';
import { productFolderURL } from '~/src/config';
import '~/src/styles/product.css';


class List extends Component {

  componentWillUnmount() {
    this.props.clearProducts();
    }

   componentWillReceiveProps(nextProps) {
   if(nextProps.data !== this.props.data){
    this.props.clearProducts();
    this.props.fetchProducts({data: nextProps.data});
   }
  }

  clickedPatchProduct() {

    let clickDescription = this.refs.descriptionBox.getValue() ? this.refs.descriptionBox.getValue() : this.refs.descriptionBox.props.placeholder;
    let clickPrice = this.refs.priceBox.getValue() ? this.refs.priceBox.getValue() : this.refs.priceBox.props.placeholder;

    this.props.boundPatchProduct({
      name: this.state.selectedProduct.name,
      key: this.state.selectedProduct.key,
      description: clickDescription,
      price: clickPrice,
      shop: this.props.data
    });
    this.refs.descriptionBox.getInputDOMNode().value = '';
    this.refs.priceBox.getInputDOMNode().value = '';
    this.setState({ showModal: false });
  }

  clickedDeleteProduct() {

    let deleteObject = {
      name: this.state.selectedProduct.name,
      index: this.state.selectedProduct.index
    };

    this.props.deleteProduct(deleteObject);

    this.setState({ 
      showModal: false,
      selectedProduct: {}
     });
  }


  constructor(props) {
    super(props);
      this.state = {
        showModal: false,
        selectedProduct: {colors:[],sizes:[],images:[]}
      };
  }

  close() {
    this.setState({ 
      showModal: false,
      selectedProduct: {colors:[],sizes:[],images:[]}
    });
  }

  open(name) {

    let selected = _.find(this.props.products, function(o) { return o.name == name.target.innerText});
    let index = _.findIndex(this.props.products, function(o) { return o.name == name.target.innerText});

    selected.index = index

    this.setState({ 
      showModal: true ,
      selectedProduct: selected
    });
  }

  onaColorBoxChange(){}
  clickedAddColor(){}
  onaSizeBoxChange(){}
  clickedAddSize(){}
  onaSizeBoxChange(){}
  clickedAddImage(){}
  imageUploadStarted(){}
  imageUploadComplete(){}

  render() {

    var colorLength = this.state.selectedProduct.colors.length;
    var sizeLength = this.state.selectedProduct.sizes.length;
    var imageLength = this.state.selectedProduct.images.length;

    return (

      <div className="product-button">

        <DropdownButton bsStyle={'primary'} title={'Select a product to view/edit'} id="product-view-edit">

          {this.props.products.map((product, index) =>
            <MenuItem eventKey={index} key={index} onClick={this.open.bind(this)}> {product.name} </MenuItem>
                )}

        </DropdownButton>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit <b>{this.state.selectedProduct.name}</b> by modifying it below and then click Edit product</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Input label="Product Name" readOnly="true" type="ProductName" ref='nameBox' value={this.state.selectedProduct.name} />

          <Input label="Product Description" type="ProductDescription" ref='descriptionBox' value={this.state.selectedProduct.description}/>

          <Input label="Product Price" type="ProductPrice" ref='priceBox' value={this.state.selectedProduct.price} />

          <label htmlFor="inputProductColor">Color(s)</label>
            <Grid fluid>
 
          {this.state.selectedProduct.colors.map((color, index) =>
                            <Row className="padded-row">
                    <Col xs={5} md={3}>
                    <Input className="color-box" type="productColorName" ref={'colorNameBox'+index} onChange={this.onaColorBoxChange.bind(this)}  value={color[0]} />
                    </Col>
                    <Col xs={5} md={3}>
                    <Input type="productColorHex" ref={'colorHexBox'+index} onChange={this.onaColorBoxChange.bind(this)}  value={color[1]}  />
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
<label htmlFor="inputProductSize">Size(s)</label>
            <Grid fluid ref='sizeBox'>

          {this.state.selectedProduct.sizes.map((size, index) =>

                <Row className="padded-row">
                    <Col xs={5} md={3}>
                    <Input className="size-box" type="productSize" onChange={this.onaSizeBoxChange.bind(this, index)} ref={'sizeBox'+index} value={size} />
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


            <label htmlFor="inputProductImage">Image(s)</label>
            <Grid fluid>

          {this.state.selectedProduct.images.map((image, index) =>
                <div>
                    <Row className="padded-row">
                        <Col >
                            <Image src={image} responsive />
                        </Col>
                    </Row>
                    <Row className="padded-row">
                        <Col >
                        <S3Uploader ref={'imageBox'+index}
                            onUploadStart={this.imageUploadStarted.bind(this)}
                            onUploadFinish={this.imageUploadComplete.bind(this)}
                            folderURL={productFolderURL}/>
                        </Col>
                    </Row>
                </div>
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
          <ButtonInput className="product-button" type="submit" bsStyle="primary" onClick = {this.clickedPatchProduct.bind(this)} >Edit product</ButtonInput>
          <ButtonInput className="product-button" type="submit" bsStyle="danger" onClick = {this.clickedDeleteProduct.bind(this)} >Delete this product!</ButtonInput>
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