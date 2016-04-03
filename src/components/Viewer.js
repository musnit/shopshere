import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Button, Modal } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';

class Viewer extends Component {

	constructor(props) {
    super(props);
    this.state = {
			showModal: false
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
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
						Todo: here you can choose which product popup this hotspot should show, or delete this hotspot
	        </Modal>
			</div>
    );
  }
};

export default Viewer;
