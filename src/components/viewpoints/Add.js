import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import { unboundAddViewpoint } from '~/src/actions/viewpoints';

class Add extends Component {

  clickedAddViewpoint() {
    this.props.boundAddViewpoint({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      shop: this.props.data,
      imageFile: this.refs.imageFileBox.getValue()
    });
    this.refs.nameBox.value = '';
    this.refs.keyBox.value = '';
    this.refs.imageFileBox.value = '';
  }

  render() {
    return (
      <div>
          <br></br>
          <h2> Add a new Viewpoint: </h2>
          <label htmlFor="inputViewpointName" className="sr-only">View Name</label>
          <Input type="ViewpointName" ref='nameBox' placeholder="Viewpoint Name..." required />
          <label htmlFor="inputViewpointKey" className="sr-only">View Key</label>
          <Input type="ViewpointKey" ref='keyBox' placeholder="Viewpoint Key..." />
          <label htmlFor="inputViewpointImageFile" className="sr-only">Viewpoint Image</label>
          <Input type="ViewpointImageFile" ref='imageFileBox' placeholder="Viewpoint Image..." />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large"  onClick = {this.clickedAddViewpoint.bind(this)} >Add viewpoint</ButtonInput>
          <br></br>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddViewpoint: bindActionCreators(unboundAddViewpoint, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Add);
