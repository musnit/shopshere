import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../Navbar.js';
import MyViewpointsFetchViewpoints from '~/src/components/MyViewpointsFetchViewpoints';
import MyViewpointsAddViewpoint from '~/src/components/MyViewpointsAddViewpoint';

class MyViewpoints extends Component {
  render() {
    return (
        <div>
            <h1> My Shop`s Viewpoints</h1>
            <br></br>
            <div>
                <MyViewpointsFetchViewpoints> </MyViewpointsFetchViewpoints>
                <MyViewpointsAddViewpoint data={this.props.data}> </MyViewpointsAddViewpoint>            
            </div>
        </div>
    );
  }
}

export default MyViewpoints;
