import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { Input, ButtonInput, Button, Modal, DropdownButton, MenuItem, Image, Label, Grid, Row, Col,ButtonGroup,ButtonToolbar,Glyphicon } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';
import { connectProductToHotspot, deleteHotspot, fetchHotspots } from '~/src/actions/hotspots';
import { clearProducts, fetchProducts } from '~/src/actions/products';
import { find, findIndex } from 'lodash';

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
            currentProduct: ""
        };
    }

    componentWillReceiveProps(nextProps) {
	   if(nextProps.data !== this.props.data){
	    this.props.clearProducts();
	    this.props.fetchProducts({data: nextProps.data});
	    this.props.fetchHotspots({data: nextProps.data});
	   }
	  }

    componentDidMount() {
        this.sphereViewer = new SphereViewer({
            domContainerElement: document.getElementById('viewer-placeholder'),
            openModal: this.open.bind(this)
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
    	if (!this.state.modalMode) {
    		var thisHotspot = _.find(this.props.hotspots, function(o) { return o.name == name });
    		if (thisHotspot.product) {
    			var thisProduct = _.find(this.props.products, function(o) { return o.name == thisHotspot.product });
    		}
    		else {
    			var thisProduct = this.state.currentProduct;
    		}
    		
    	}
    	else {
    		var thisProduct = this.state.currentProduct;

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
            return o.name == name.target.innerText
        });

        this.props.connectProductToHotspot({
            name: this.state.currentHotspot,
            shop: this.props.data,
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
        this.setState({ showNewHotspotModal: true});

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

    addNewNavigationHotspot() {
        this.closeNewNavigationHotspotModal();
        this.sphereViewer.addNewNavigationHotspot.bind(this.sphereViewer);
        this.sphereViewer.addNewNavigationHotspot();
    }

    addNewProductHotspot() {
        this.closeNewProductHotspotModal();
        this.sphereViewer.addNewProductHotspot.bind(this.sphereViewer);
        this.sphereViewer.addNewProductHotspot();
    }


  render() {
    return (
<div>
    <div>
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

            <Row className="show-grid">
                <Col xs={5}>
                    <div className="view-button">
                        <button
                        className = "btn btn-lg btn-primary"
                        type = "submit"
                        onClick = {this.sphereViewer && this.sphereViewer.disableOrbit.bind(this.sphereViewer)} >
                        Toggle Camera Controls
                        </button>
                    </div>
                </Col>
            </Row>

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
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                    <h4>Toggle these sliders below to position your new hotspot, then save the hotspot location.</h4>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={4}>
                <div className="slider">
                    <p>
                        <Label>Rotate around Y &ndash; Axis</Label>
                    </p>
                    <Slider min={0} step={0.01} max = {Math.PI * 2} defaultValue={0} onChange={this.sphereViewer && this.sphereViewer.sliderYChange.bind(this.sphereViewer)} />
                </div>
                </Col>
                <Col xs={4}>
                <div className="slider">
                    <p><Label>Rotate around X &ndash; Axis</Label></p>
                    <Slider min={0} step={0.01} max = {Math.PI * 2} defaultValue={0} onChange={this.sphereViewer && this.sphereViewer.sliderXChange.bind(this.sphereViewer)} />
                </div>
                </Col>
                <Col xs={4}>
                <div className="slider">
                    <p><Label>Rotate around Z &ndash; Axis</Label></p>
                    <Slider min={0} step={0.01} max = {Math.PI * 2} defaultValue={0} onChange={this.sphereViewer && this.sphereViewer.sliderZChange.bind(this.sphereViewer)} />
                </div>
                </Col>
            </Row>
        </Grid>
    </div>


    <div id='viewer-placeholder'></div>

    <Modal show={this.state.showModal && this.state.modalMode} onHide={this.close.bind(this)}>
	    <Modal.Header closeButton>
	        <Modal.Title>Select a product to connect with this hotspot ({this.state.currentHotspot}). Or alternatively you can delete this hotspot.</Modal.Title>
	    </Modal.Header>
	    <Modal.Body>
	        <div className="product-button">
	            <DropdownButton bsStyle={'primary'} title={'Select a product to connect with this hotspot'} id="product-view-edit">
	                {this.props.products.map((product, index) =>
	                <MenuItem eventKey={index} key={index} onClick={this.connectProductToHotspot.bind(this)}> {product.name} </MenuItem>
	                )}
	            </DropdownButton>
	        </div>
	    </Modal.Body>
	    <Modal.Footer>
	        <ButtonInput className="hotspot-button" type="submit" bsStyle="danger" onClick = {this.clickedDeleteHotspot.bind(this)} >Delete this hotspot!</ButtonInput>
	    </Modal.Footer>
    </Modal>
    <Modal show={this.state.showModal && !this.state.modalMode} onHide={this.close.bind(this)}>
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
	    <Modal.Footer>
	        <label>Quantity</label>
	        <Input type="Quantity" ref='quantitybox' placeholder="Quantity..." />
	        <ButtonInput className="hotspot-button" type="submit" bsStyle="primary"  >Add to cart</ButtonInput>
	    </Modal.Footer>
    </Modal>

    <Modal show={this.state.showNewHotspotModal} onHide={this.closeNewHotspotModal.bind(this)}>
        <Modal.Header closeButton>
            <Modal.Title>Select the type of hotspot you would like to add:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ButtonToolbar>
        <ButtonGroup className="view-button-left">
            <Button   bsSize="large" type="submit" bsStyle="primary" onClick = {this.showNewProductHotspotModal.bind(this)} >Product Hotspot  <Glyphicon glyph="tags" />  </Button>
        </ButtonGroup>

        <ButtonGroup className="view-button-right">
            <Button   bsSize="large" type="submit" bsStyle="primary" onClick = {this.showNewNavigationHotspotModal.bind(this)} > Navigation Hotspot  <Glyphicon glyph="transfer" /> </Button>
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
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedHotspots);