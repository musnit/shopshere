import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { Input, ButtonInput, Button, Modal, DropdownButton, MenuItem, Image } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';
import { connectProductToHotspot, deleteHotspot, fetchHotspots } from '~/src/actions/hotspots';
import { find, findIndex } from 'lodash';
import '~/src/styles/product.css';
import '~/src/styles/hotspot.css';


class Viewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	modalMode: true,
            showModal: false,
            currentHotspot: "",
            currentProduct: ""
        };
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
    		var thisProduct = _.find(this.props.products, function(o) { return o.name == thisHotspot.product });
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
            name: this.state.currentHotspot
        };

        this.props.deleteHotspot(deleteObject);

        this.setState({
        	modalMode: this.state.modalMode,
            showModal: false,
            currentHotspot: "",
            currentProduct: this.state.currentProduct
        });
    }





  render() {
    return (
		<div>

		    <div className="view-button">
		        <button
		        className = "btn btn-lg btn-primary"
		        type = "submit"
		        onClick = {this.setModalTypeToOwner.bind(this)} >
		        View Hotspot as Shopowner
		        </button>
		    </div>

		    <div className="view-button">
		        <button
		        className = "btn btn-lg btn-primary"
		        type = "submit"
		        onClick = {this.setModelTypeToShopper.bind(this)} >
		        Preview Hotspot as Shopper
		        </button>
		    </div>

		    <div className="view-button">
		        <button
		        className = "btn btn-lg btn-primary"
		        type = "submit"
		        onClick = {this.sphereViewer && this.sphereViewer.disableOrbit.bind(this.sphereViewer)} >
		        Toggle Camera Controls
		        </button>
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
		        <Image className="modal-image" src="/images/womens_grey_jacket.jpg" rounded/>
		        </div>

		        </Modal.Body>

		        <Modal.Footer>

		                  <label>Quantity</label>

          				  <Input type="Quantity" ref='quantitybox' placeholder="Quantity..." />

		            <ButtonInput className="hotspot-button" type="submit" bsStyle="primary"  >Add to cart</ButtonInput>
		        </Modal.Footer>
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
  return { 
  	products,
  	hotspots
  	};
}

function mapDispatchToProps(dispatch) {
  return {
    connectProductToHotspot: bindActionCreators(connectProductToHotspot, dispatch),
    deleteHotspot: bindActionCreators(deleteHotspot, dispatch),
    fetchHotspots: bindActionCreators(fetchHotspots, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedHotspots);