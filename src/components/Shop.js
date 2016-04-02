import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Viewpoints from '~/src/components/Viewpoints';
import Products from '~/src/components/Products';
import { Tabs, Tab } from 'react-bootstrap';

class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewpointsShowing: true,
      productsShowing: false
    };
  }

  render() {

    var name = this.props.params.name;

    return (
      <div>
        <div>
          <h1>Shop: <b>{name}</b></h1>
        </div>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Viewpoints">
            <Viewpoints data={name} />
          </Tab>
          <Tab eventKey={2} title="Products">
            <Products data={name} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = state.shops;
  return { shops };
}

export default connect(mapStateToProps)(Shop);
