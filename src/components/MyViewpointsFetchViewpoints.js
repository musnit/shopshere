import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
//import fetch from '~/src/components/fetch';

class MyViewpointsFetchViewpoints extends Component {
  render() {
    return (
      <div className="container">
          <br></br>
          <h2> List of your Viewpoints: </h2>
          <div>

          </div>
          <br></br>
      </div>
    );
  }
}

// const FetchedViewpoints = fetch(MyViewpointsFetchViewpoints, {
//   actions: undefined
// });


// function mapStateToProps(state) {
//   const shops = undefined
//   return { shops };
// }


// function mapDispatchToProps(dispatch) {
//   return {
//     fetchShops: undefined
//   };
// }

export default MyViewpointsFetchViewpoints;

