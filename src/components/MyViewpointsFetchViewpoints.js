import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import ViewpointListItemWrapper from '~/src/components/ViewpointListItemWrapper';
import { fetchViewpoints, clearViewpoints } from '~/src/actions/viewpoints';


class MyViewpointsFetchViewpoints extends Component {

  componentWillUnmount() {
    this.props.clearViewpoints();
  }

  render() {

    return (
      <div className="container">
          <br></br>
          <h2> List of your Viewpoints: </h2>
          <div>
              {this.props.viewpoints.map((viewpoint, index) => 
                <ViewpointListItemWrapper key={index} data={viewpoint}/>
              )}
          </div>
          <br></br>
      </div>
    );
  }
}

const FetchedViewpoints = fetch(MyViewpointsFetchViewpoints, {
  actions: [fetchViewpoints]
});


function mapStateToProps(state) {
  const viewpoints = state.viewpoints;
  return { viewpoints };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchViewpoints: bindActionCreators(fetchViewpoints, dispatch),
    clearViewpoints: bindActionCreators(clearViewpoints, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedViewpoints);