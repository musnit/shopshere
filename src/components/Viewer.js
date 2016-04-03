import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Button } from 'react-bootstrap';
import SphereViewer from './SphereViewer.js';

class Viewer extends Component {

	constructor(props) {
    super(props);
    this.state = {};
  }

	componentDidMount() {
		this.sphereViewer = new SphereViewer({
			domContainerElement: document.getElementById('viewer-placeholder')
		});
  }

  componentWillUnmount() {
    let canvasElement = document.getElementsByTagName("canvas");
    canvasElement[0].remove();
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
			</div>
    );
  }
};

export default Viewer;
