import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MyViewpointsFetchViewpoints from '~/src/components/MyViewpointsFetchViewpoints';
import MyViewpointsAddViewpoint from '~/src/components/MyViewpointsAddViewpoint';

class MyViewpoints extends Component {
  render() {
    return (
        <div>
          <MyViewpointsFetchViewpoints data={this.props.data}> </MyViewpointsFetchViewpoints>
          <MyViewpointsAddViewpoint data={this.props.data}> </MyViewpointsAddViewpoint>
        </div>
    );
  }
}

export default MyViewpoints;
