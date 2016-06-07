import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import List from '~/src/components/viewpoints/List';
import Add from '~/src/components/viewpoints/Add';

class Viewpoints extends Component {

  render() {
    return (
        <div>
          <List shopID={this.props.shopID} />
          <Add shopID={this.props.shopID} />
        </div>
    );
  }
}

export default Viewpoints;
