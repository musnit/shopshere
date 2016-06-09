import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { Input, ButtonInput, Button, Modal, DropdownButton, MenuItem, Image, Label, Grid, Row, Col,ButtonGroup,ButtonToolbar,Glyphicon } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';
import { connectProductToHotspot, deleteHotspot, fetchHotspots, unboundAddHotspot, clearHotspots } from '~/src/actions/hotspots';
import { unboundPatchShop } from '~/src/actions/shops';
import { clearProducts, fetchProducts } from '~/src/actions/products';
import { find, findIndex, forEach } from 'lodash';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import '~/src/styles/product.css';
import '~/src/styles/hotspot.css';
import '~/src/styles/viewer.css';
import '~/src/styles/viewpoint.css';

const blackFill = "/images/black.png";

class Viewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	modalMode: true,
            showModal: false,
            showNewHotspotModal: false,
            showNewProductHotspotModal: false,
            showNewNavigationHotspotModal: false,
            currentViewpoint: this.props.viewpointID,
            currentHotspot: "",
            currentProduct: "",
            newHSCoords:"",
            key: undefined,
            entranceViewpointNeeded:false,
            thisIsTheEntrance: false,
            noSelection: false
        };
    }

    componentWillReceiveProps(nextProps) {

        //if change to new shop:
	   if(nextProps.shopID !== this.props.shopID){
	    this.props.clearProducts();
        this.props.clearHotspots();
	    this.props.fetchProducts({shopID: nextProps.shopID});
	    this.props.fetchHotspots({
            shopID: nextProps.shopID,
            viewpointID: nextProps.viewpointID
        });
        this.checkForEntranceViewpoint(nextProps.viewpointID);
        this.setState({ currentViewpoint: 0, noSelection: true });
        this.blackViewpoint(blackFill);
	   } //if change to new viewpoint:
       else if ( nextProps.viewpointID !== this.props.viewpointID ){
        this.props.clearHotspots();
        this.props.fetchHotspots({
            shopID: nextProps.shopID,
            viewpointID: nextProps.viewpointID
        });
        this.changeViewpoint(nextProps.viewpointID);
        this.checkForEntranceViewpoint(nextProps.viewpointID);
        this.setState({ noSelection: false });
       }

       if(nextProps.hotspots !== this.props.hotspots){
        this.removeAllHotspots();
        this.addHotspotsToViewpoint(nextProps.hotspots);
       } 
	  }

    componentDidMount() {
        var viewpointID = this.props.viewpointID;
        var viewpointImage = _.find(this.props.viewpoints, function(o) { return o.id == viewpointID });
        var imageURL = viewpointImage.imageFile;
        this.sphereViewer = new SphereViewer({
            domContainerElement: document.getElementById('viewer-placeholder'),
            openModal: this.open.bind(this),
            openNewHSModal: this.addNewHotspotModal.bind(this),
            imageURL:imageURL
        });
        this.checkForEntranceViewpoint(viewpointID);
    }

    componentWillUnmount() {
        let canvasElement = document.getElementsByTagName("canvas");
        canvasElement[0].remove();
    }

    checkForEntranceViewpoint(viewpointID){
        if (!this.props.thisShop.entranceViewpoint) {
            this.setState( { entranceViewpointNeeded: true, thisIsTheEntrance: false } );
        }
        else if (this.props.thisShop.entranceViewpoint == viewpointID) {
            this.setState( { entranceViewpointNeeded: false, thisIsTheEntrance: true } );
        }
        else {
            this.setState( { entranceViewpointNeeded: false, thisIsTheEntrance: false } );
        }
    }

    close() {
        this.setState({
        	modalMode: this.state.modalMode,
            showModal: false,
            currentHotspot: "",
            currentProduct: ""
        });
    }

    open(id) {

        var thisProduct;
		var thisHotspot = _.find(this.props.hotspots, function(o) { return o.id == id });
		if (thisHotspot.type === "product") {
			thisProduct = _.find(this.props.products, function(o) { return o.id == thisHotspot.prodview });
		}
        else if (thisHotspot.type === "navigation") {
            var navigateTo = _.find(this.props.viewpoints, function(o) { return o.id == thisHotspot.prodview });
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
            currentHotspot: thisHotspot.name,
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


    clickedDeleteHotspot() {

        let deleteObject = {
            ID: this.state.currentHotspot.id,
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

    addNewNavigationHotspot(event) {
        var inputName = event.target.innerText;
        var viewpointID = event.currentTarget.attributes.data.value;
        var outputName = this.state.currentViewpoint  +" To "+inputName;
        this.closeNewNavigationHotspotModal();
        this.sphereViewer.addNewNavigationHotspot.bind(this.sphereViewer);
        this.sphereViewer.addNewNavigationHotspot(outputName, this.state.newHSCoords);
        this.saveHotspot(viewpointID);
    }

    addNewProductHotspot(event) {
        var inputName = event.target.innerText;
        var productID = event.currentTarget.attributes.data.value;
        var outputName = this.state.currentViewpoint + " Sells " + inputName;
        this.closeNewProductHotspotModal();
        this.sphereViewer.addNewProductHotspot.bind(this.sphereViewer);
        this.sphereViewer.addNewProductHotspot(outputName, this.state.newHSCoords);   
        this.saveHotspot(productID);     
    }

    saveHotspot(viewpointID){
        this.sphereViewer.saveNewHotspotLocation.bind(this.sphereViewer);
        var savedParams = this.sphereViewer.saveNewHotspotLocation();

        this.addHotspot( savedParams, viewpointID );

    }

    addHotspot( params, linktoID ) {

        this.props.boundAddHotspot({

          shop: this.props.shopID,

          prodview: linktoID,

          viewpoint: this.state.currentViewpoint,

          position: params[0],

          type: params[1]

        });
    }

    navigateToViewpoint( navigateTo ) {

        this.removeAllHotspots();
        this.props.clearHotspots();
        this.props.fetchHotspots({
            shopID: navigateTo.shop,
            viewpointID: navigateTo.id
        });
        this.changeViewpoint(navigateTo.id);
        this.checkForEntranceViewpoint(navigateTo.id);
    
    }

    removeAllHotspots() {
        this.sphereViewer.removeHotspots.bind(this.sphereViewer);
        this.sphereViewer.removeHotspots();

    }

    addHotspotsToViewpoint(hotspots){
        
        var addAHotspot = this.sphereViewer.addAHotspot.bind(this.sphereViewer);
        _.forEach(hotspots, function(o) { addAHotspot(o); });
    }

    blackViewpoint(imageURL){

        this.sphereViewer.changeBackgroundImage.bind(this.sphereViewer);
        this.sphereViewer.changeBackgroundImage(imageURL);
        this.setState({ 
            key: Math.random()
            })
    }

    changeViewpoint(vpid){
        var vpID = vpid;
        var viewpointImage = _.find(this.props.viewpoints, function(o) { return o.id == vpID });
        var imageURL = viewpointImage.imageFile;
        this.sphereViewer.changeBackgroundImage.bind(this.sphereViewer);
        this.sphereViewer.changeBackgroundImage(imageURL);
        this.setState({ 
            key: Math.random(),
            currentViewpoint: vpID })
    }

    clickedSetToEntranceViewpoint(){
        var thisShopObject = _.cloneDeep(this.props.thisShop);
        var viewpointID = this.state.currentViewpoint;
        thisShopObject.entranceViewpoint = viewpointID;
        this.props.boundPatchShop(thisShopObject);
        this.setState( { entranceViewpointNeeded: false, thisIsTheEntrance: true } );
    }


  render() {

    var currentViewpointID = this.state.currentViewpoint;

    var viewpointName;

    if(typeof this.props.viewpoints != "undefined" && this.props.viewpoints != null && this.props.viewpoints.length > 0 && currentViewpointID != 0){
      viewpointName = _.find(this.props.viewpoints, function(o) { return o.id == currentViewpointID }).name;
    }
    else {
      viewpointName = "No viewpoint selected"
    }

    var shopName = this.props.thisShop.name;

    return (
        <div >
            <div>
                <Grid className="grid-panel">
                    <Row className="show-grid">
                            <Col xs={12}>
                                <h3> Viewpoint: <b>{viewpointName}</b></h3>
                            </Col>
                    </Row>

                    {!this.state.noSelection ? 
                        <div>

                    { this.state.entranceViewpointNeeded ?                     
                    <div className="entrance-view-box">

                    <Row className="show-grid">
                        <Col xs={12} className="entrance-view-text">
                        <h4>This shop has not yet set an entrance viewpoint!</h4>
                        </Col>
                        </Row>
                        <Row>
                        <Col xs={12}>
                        <div className="entrance-view-button">
                            <Button
                            bsStyle="warning"
                                
                                type = "submit"
                                onClick = {this.clickedSetToEntranceViewpoint.bind(this)} >
                            Set <b>{viewpointName}</b> as <b>{shopName}&#8217;s</b> entrance viewpoint.
                            </Button>
                        </div>
                        </Col>

                    </Row> 


                    </div> : null }

                    
                    <div className="edit-box">


                    <Row className="show-grid">
                        <Col xs={12} className="edit-text">
                        <h4><Glyphicon glyph="hand-down" /> Double-Click anywhere on the viewpoint below to add a hotspot.</h4>
                        </Col>
                    </Row>


                    </div>

                    </div> : null }

                </Grid>
            </div>
            


            <div id='viewer-placeholder'></div>

            {!this.state.noSelection ? 

                <Grid className="grid-panel">

                { !this.state.entranceViewpointNeeded && this.state.thisIsTheEntrance ?                     
                    <div className="entrance-view-box">

                    <Row className="show-grid">
                        <p className="entrance-view-text"> <Glyphicon glyph="info-sign" /> This is <b>{shopName}&#8217;s</b> entrance viewpoint. </p>
                    </Row> 


                    </div> : null}


                    { !this.state.entranceViewpointNeeded && !this.state.thisIsTheEntrance ?    

                     <div className="entrance-view-box">

                    <Row className="show-grid">

                        <div className="entrance-view-button">
                            <Button
                            bsStyle="warning"
                                
                                type = "submit"
                                onClick = {this.clickedSetToEntranceViewpoint.bind(this)} >
                            Set <b>{viewpointName}</b> as <b>{shopName}&#8217;s</b> entrance viewpoint.
                            </Button>
                        </div>

                    </Row> 


                    </div> : null}


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
                </Grid> : null }

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
                            <MenuItem eventKey={index} key={index} data={product.id} onClick={this.addNewProductHotspot.bind(this)}> {product.name} </MenuItem>
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
                            <MenuItem eventKey={index} key={index} data={viewpoint.id} onClick={this.addNewNavigationHotspot.bind(this) }> {viewpoint.name} </MenuItem>
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
    clearHotspots: bindActionCreators(clearHotspots, dispatch),
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedHotspots);