import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { Input, ButtonInput, Button, Modal, DropdownButton, MenuItem, Image, Label, Grid, Row, Col,ButtonGroup,ButtonToolbar,Glyphicon } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';
import { connectProductToHotspot, deleteHotspot, fetchHotspots, unboundAddHotspot, clearHotspots } from '~/src/actions/hotspots';
import { clearProducts, fetchProducts } from '~/src/actions/products';
import { find, findIndex, forEach } from 'lodash';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import '~/src/styles/product.css';
import '~/src/styles/hotspot.css';
import '~/src/styles/viewer.css';
import '~/src/styles/viewpoint.css';


class Viewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	modalMode: true,
            showModal: false,
            showNewHotspotModal: false,
            showNewProductHotspotModal: false,
            showNewNavigationHotspotModal: false,

            currentHotspot: "",
            currentProduct: "",
            isEditing:true,
            newHSCoords:""
        };
    }

    componentWillReceiveProps(nextProps) {

        //if change to new shop:
	   if(nextProps.data[0] !== this.props.data[0]){
	    this.props.clearProducts();
        this.props.clearHotspots();
	    this.props.fetchProducts({data: nextProps.data[0]});
	    this.props.fetchHotspots({data: nextProps.data});
	   } //if change to new viewpoint:
       else if ( nextProps.data[1] !== this.props.data[1] ){
        this.props.clearHotspots();
        this.props.fetchHotspots({data: nextProps.data});
        this.changeViewpoint(nextProps.data[1]);
       }

       if(nextProps.hotspots !== this.props.hotspots){
        this.removeAllHotspots();
        this.addHotspotsToViewpoint(nextProps.hotspots);
       } 
	  }

    componentDidMount() {
        var name = this.props.data[1];
        var viewpointImage = _.find(this.props.viewpoints, function(o) { return o.name == name });
        var imageURL = viewpointImage.imageFile;
        this.sphereViewer = new SphereViewer({
            domContainerElement: document.getElementById('viewer-placeholder'),
            openModal: this.open.bind(this),
            openNewHSModal: this.addNewHotspotModal.bind(this),
            imageURL:imageURL
        });
    }

    componentWillUnmount() {
        let canvasElement = document.getElementsByTagName("canvas");
        canvasElement[0].remove();
    }

    close() {
        this.setState({
        	modalMode: this.state.modalMode,
            showModal: false,
            currentHotspot: "",
            currentProduct: ""
        });
    }

    open(name) {

        var thisProduct;
		var thisHotspot = _.find(this.props.hotspots, function(o) { return o.name == name });
		if (thisHotspot.type === "product") {
			thisProduct = _.find(this.props.products, function(o) { return o.name == thisHotspot.prodview });
		}
        else if (thisHotspot.type === "navigation") {
            var navigateTo = _.find(this.props.viewpoints, function(o) { return o.name == thisHotspot.prodview });
            this.navigateToViewpoint( navigateTo );
            this.setState({ 
                modalMode: this.state.modalMode,
                showModal: false,
                currentHotspot: "",
                currentProduct: "" });
            return; 
        }
		else {
			thisProduct = this.state.currentProduct;
		}
    		

        this.setState({
        	modalMode: this.state.modalMode,
            showModal: true,
            currentHotspot: name,
            currentProduct: thisProduct
        });

    }

    setModalTypeToOwner() {
        this.state = {
        	modalMode: true,
            showModal: false,
            currentHotspot: this.state.currentHotspot,
            currentProduct: this.state.currentProduct
        };
    }

    setModelTypeToShopper() {

    	this.state = {
        	modalMode: false,
            showModal: false,
            currentHotspot: this.state.currentHotspot,
            currentProduct: this.state.currentProduct
        };
    }

    connectProductToHotspot(name) {

        let selected = _.find(this.props.products, function(o) {
            return o.name == name.target.innerText;
        });

        this.props.connectProductToHotspot({
            name: this.state.currentHotspot,
            shop: this.props.data[0],
            product: selected.name
        });


        this.setState({
        	modalMode: this.state.modalMode,
            showModal: false,
            currentHotspot: "",
            currentProduct: this.state.currentProduct
        });

    }

    clickedDeleteHotspot() {

        let deleteObject = {
            name: this.state.currentHotspot,
            index: 0 //fix this value later
        };

        this.props.deleteHotspot(deleteObject);

        this.setState({
        	modalMode: this.state.modalMode,
            showModal: false,
            currentHotspot: "",
            currentProduct: this.state.currentProduct
        });
    }

    addNewHotspot() {
        this.setState({ isEditing: true});        
    }

    addNewHotspotModal(Coords) {
        this.setState({ 
            showNewHotspotModal: true,
            newHSCoords: Coords
        });
    }

    closeNewHotspotModal() {
        this.setState({ showNewHotspotModal: false});
    }

    showNewProductHotspotModal() {
        this.setState({ showNewProductHotspotModal: true});
        this.closeNewHotspotModal();
    }

    closeNewProductHotspotModal() {
        this.setState({ showNewProductHotspotModal: false});
        
    }

    showNewNavigationHotspotModal() {
        this.setState({ showNewNavigationHotspotModal: true});
        this.closeNewHotspotModal();
    }

    closeNewNavigationHotspotModal() {
        this.setState({ showNewNavigationHotspotModal: false});
    }  

    addNewNavigationHotspot(name) {
        this.setState({ isEditing: true});
        var inputName = name.target.innerText;
        this.closeNewNavigationHotspotModal();
        this.sphereViewer.addNewNavigationHotspot.bind(this.sphereViewer);
        this.sphereViewer.addNewNavigationHotspot(inputName, this.state.newHSCoords);
        this.saveHotspot();
    }

    addNewProductHotspot(name) {
        this.setState({ isEditing: true});
        var inputName = name.target.innerText;
        this.closeNewProductHotspotModal();
        this.sphereViewer.addNewProductHotspot.bind(this.sphereViewer);
        this.sphereViewer.addNewProductHotspot(inputName, this.state.newHSCoords);   
        this.saveHotspot();     
    }

    saveHotspot(){
        this.sphereViewer.saveNewHotspotLocation.bind(this.sphereViewer);
        var savedParams = this.sphereViewer.saveNewHotspotLocation();

        this.addHotspot( savedParams );
        this.setState({ isEditing: true});
    }

    addHotspot( params ) {
        this.props.boundAddHotspot({

          name: params[0],

          shop: this.props.data[0],

          prodview: params[0],

          viewpoint: this.props.data[1],

          position: params[1],

          type: params[2]

        });
    }

    navigateToViewpoint( navigateTo ) {

        this.removeAllHotspots();
        this.props.clearHotspots();
        this.props.fetchHotspots({data: [navigateTo.shop ,navigateTo.name]});
        this.changeViewpoint(navigateTo.name);
    
    }

    removeAllHotspots() {
        this.sphereViewer.removeHotspots.bind(this.sphereViewer);
        this.sphereViewer.removeHotspots();

    }

    addHotspotsToViewpoint(hotspots){
        
        var addAHotspot = this.sphereViewer.addAHotspot.bind(this.sphereViewer);
        _.forEach(hotspots, function(o) { addAHotspot(o); });
    }

    changeViewpoint(vpname){
        var name = vpname;
        var viewpointImage = _.find(this.props.viewpoints, function(o) { return o.name == name });
        var imageURL = viewpointImage.imageFile;
        this.sphereViewer.changeBackgroundImage.bind(this.sphereViewer);
        this.sphereViewer.changeBackgroundImage(imageURL);
    }


  render() {
    return (
        <div>
            <div>
                <Grid className="grid-panel">
                    <Row className="show-grid">
                            <Col xs={5}>
                                <h3> Viewpoint: <b>{this.props.data[1]}</b></h3>
                            </Col>
                    </Row>
                    {/*
                    <Row className="show-grid">
                        <Col xs={5}>
                        <div className="view-button">
                            <button
                            className = "btn btn-lg btn-primary"
                            type = "submit"
                            onClick = {this.changeViewpoint.bind(this)} >
                            Change Background Image
                            </button>
                        </div>
                        </Col>
                    </Row>
                       */}
                    { !this.state.isEditing ?
                    <Row className="show-grid">
                        <Col xs={10}>
                        <div className="view-button">
                            <button
                                className = "btn btn-lg btn-primary"
                                type = "submit"
                                onClick = {this.addNewHotspot.bind(this)} >
                            Add a new hotspot
                            </button>
                        </div>
                        </Col>
                    </Row> : null }
                    { this.state.isEditing ?
                    <div className="edit-box">


                    <Row className="show-grid">
                        <Col xs={12} className="edit-text">
                        <h4>Double-Click anywhere on the viewpoint below to add a hotspot.</h4>
                        </Col>
                    </Row>


                    </div> : null }

                </Grid>
            </div>
            
            <div id='viewer-placeholder'></div>

                <Grid className="grid-panel">
                    <Row className="show-grid">
                        <Col xs={5}>
                        <div className="view-button">
                            <button
                                className = "btn btn-lg btn-primary"
                                type = "submit"
                                onClick = {this.setModalTypeToOwner.bind(this)} >
                            View Hotspot as Shopowner
                            </button>
                        </div>
                        </Col>
                        <Col xs={5}>
                        <div className="view-button">
                            <button
                                className = "btn btn-lg btn-primary"
                                type = "submit"
                                onClick = {this.setModelTypeToShopper.bind(this)} >
                            Preview Hotspot as Shopper
                            </button>
                        </div>
                        </Col>
                    </Row>
                </Grid>

            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>{this.state.currentProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Description:</label>
                <p>{this.state.currentProduct.description}</p>
                <label>Price:</label>
                <p>R{this.state.currentProduct.price}</p>
                <div>
                    <Image className="modal-image" src={this.state.currentProduct.imageURL} rounded/>
                </div>
            </Modal.Body>
            <Modal.Footer show={false}>
                <label>Quantity</label>
                <Input type="Quantity" ref='quantitybox' placeholder="Quantity..." />
                <ButtonInput className="hotspot-button" type="submit" bsStyle="primary"  >Add to cart</ButtonInput>


                { this.state.modalMode ?
                                <div className="admin-modal">
                                <br />
                                <div>Currently viewing as shop admin so you can:</div>

                                <ButtonInput className="hotspot-button" type="submit" bsStyle="danger" onClick = {this.clickedDeleteHotspot.bind(this)} >Delete this hotspot!</ButtonInput>

                </div> : null}


            </Modal.Footer>
            </Modal>
            <Modal show={this.state.showNewHotspotModal} onHide={this.closeNewHotspotModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select the type of hotspot you would like to add here:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ButtonToolbar>
                        <ButtonGroup className="view-button-left">
                            <Button   bsSize="large" type="submit" bsStyle="primary" onClick = {this.showNewProductHotspotModal.bind(this)} >
                                Product Hotspot  
                                <Glyphicon glyph="tags" />
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="view-button-right">
                            <Button   bsSize="large" type="submit" bsStyle="primary" onClick = {this.showNewNavigationHotspotModal.bind(this)} >
                                Navigation Hotspot  
                                <Glyphicon glyph="transfer" />
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Modal.Body>
            </Modal>
            <Modal show={this.state.showNewProductHotspotModal} onHide={this.closeNewProductHotspotModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new product hotspot:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="product-button">
                        <DropdownButton bsStyle={'primary'} title={'Select a product to link to this hotspot'} id="product-view-edit">
                            {this.props.products.map((product, index) =>
                            <MenuItem eventKey={index} key={index} onClick={this.addNewProductHotspot.bind(this)}> {product.name} </MenuItem>
                            )}
                        </DropdownButton>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={this.state.showNewNavigationHotspotModal} onHide={this.closeNewNavigationHotspotModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new product hotspot:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="product-button">
                        <DropdownButton bsStyle={'primary'} title={'Select a viewpoint to link to this hotspot'} id="product-view-edit">
                            {this.props.viewpoints.map((viewpoint, index) =>
                            <MenuItem eventKey={index} key={index} onClick={this.addNewNavigationHotspot.bind(this) }> {viewpoint.name} </MenuItem>
                            )}
                        </DropdownButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
  }
};

const FetchedHotspots = fetch(Viewer, {
  actions: [fetchHotspots]
});

function mapStateToProps(state) {
  const products = state.products;
  const hotspots = state.hotspots;
  const viewpoints = state.viewpoints;
  return { 
    viewpoints,
  	products,
  	hotspots
  	};
}

function mapDispatchToProps(dispatch) {
  return {
    connectProductToHotspot: bindActionCreators(connectProductToHotspot, dispatch),
    deleteHotspot: bindActionCreators(deleteHotspot, dispatch),
    fetchHotspots: bindActionCreators(fetchHotspots, dispatch),
    clearProducts: bindActionCreators(clearProducts, dispatch),
    fetchProducts: bindActionCreators(fetchProducts, dispatch),
    boundAddHotspot: bindActionCreators(unboundAddHotspot, dispatch),
    clearHotspots: bindActionCreators(clearHotspots, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedHotspots);