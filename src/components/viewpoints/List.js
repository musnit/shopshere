import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { fetchViewpoints, clearViewpoints } from '~/src/actions/viewpoints';
import Viewer from '../Viewer';

class List extends Component {

  componentWillUnmount() {
    this.props.clearViewpoints();
  }

  render() {

    return (
      <div>
        <label>Select a viewpoint to preview/edit:</label>
        <select>
          {this.props.viewpoints.map((viewpoint, index) =>
            <option key={index}> {viewpoint.name} </option>
          )}
        </select>
        <Viewer />
      </div>
    );
  }
}

const FetchedList = fetch(List, {
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchedList);
