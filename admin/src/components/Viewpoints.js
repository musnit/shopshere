import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import List from '~/src/components/viewpoints/List';
import Add from '~/src/components/viewpoints/Add';
import Edit from '~/src/components/viewpoints/Edit';


class Viewpoints extends Component {

  render() {
    return (
      <div>
        <div className="side">
          <Edit shopID={ this.props.shopID } />
        </div>
        <div className="side">
          <List shopID={ this.props.shopID } thisShop={ this.props.thisShop } />
        </div>
        <Add shopID={ this.props.shopID } />
      </div>
      );
  }
}

export default Viewpoints;
