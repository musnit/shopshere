import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import { addShop } from '~/src/actions/shops';

class MyViewpointsAddViewpoint extends Component {

  addShop() {
    this.props.addShop({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue()
    });
    this.refs.nameBox.value = '';
    this.refs.keyBox.value = '';
  }

  render() {
    return (
      <div className="container">
          <br></br>
          <h2> Add a new viewpoint: </h2>
          <label htmlFor="inputViewpointName" className="sr-only">View Name</label>
          <Input type="ViewpointName" ref='nameBox' placeholder="Viewpoint Name..." required />
          <label htmlFor="inputViewpointKey" className="sr-only">View Key</label>
          <Input type="ViewpointKey" ref='keyBox' placeholder="Viewpoint Key..." />
          <label htmlFor="inputViewpointImageFile" className="sr-only">Viewpoint Image</label>
          <Input type="ViewpointImageFile" ref='imageFileBox' placeholder="Viewpoint Image..." />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large"  onClick = {this.addShop.bind(this)} >Add viewpoint</ButtonInput>
          <br></br>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = state.shops;
  return {
    shops
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addShop: bindActionCreators(addShop, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyViewpointsAddViewpoint);
