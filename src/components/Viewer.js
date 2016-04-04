import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Button, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';
import { connectProductToHotspot, deleteHotspot } from '~/src/actions/hotspots';
import '~/src/styles/product.css';


class Viewer extends Component {

	constructor(props) {
    super(props);
    this.state = {
			showModal: false,
			currentHotspot: ""
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
    	showModal: false,
    	currentHotspot: ""
    	 });
  }

  open(name) {
    this.setState({ 
    	showModal: true,
    	currentHotspot: name
    	 });

  }

  connectProductToHotspot(name) {

	let selected = _.find(this.props.products, function(o) { return o.name == name.target.innerText});

	debugger;

  	this.props.connectProductToHotspot({
  		name: this.state.currentHotspot,
  		shop: this.props.data,
  		product: selected.name
  	});


  	this.setState({ 
      showModal: false,
      currentHotspot: ""
    });

  }

  clickedDeleteHotspot() {

    let deleteObject = {
      name: this.state.currentHotspot
    };

    this.props.deleteHotspot(deleteObject);

    this.setState({ 
      showModal: false,
      currentHotspot: ""
     });
  }





  render() {
    return (
			<div>
		    <div className="view-button">
	        <button
            className = "btn btn-lg btn-primary"
            type = "submit"
            onClick = {this.sphereViewer && this.sphereViewer.disableOrbit.bind(this.sphereViewer)} >
		        Toggle Camera Controls
	        </button>
		    </div>
		    <div id='viewer-placeholder'></div>
					<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
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
			</div>
    );
  }
};

function mapStateToProps(state) {
  const products = state.products;
  return { products };
}

function mapDispatchToProps(dispatch) {
  return {
    connectProductToHotspot: bindActionCreators(connectProductToHotspot, dispatch),
    deleteHotspot: bindActionCreators(deleteHotspot, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
