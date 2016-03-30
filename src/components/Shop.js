import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchOneShop } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import Viewpoints from '~/src/components/Viewpoints';
import Products from '~/src/components/Products';
import { find } from 'lodash';
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

    //this is to just filter out the one shop object we want
    //sometimes the state is empty so this logic will deal with that case

    if (this.props.shop.length == 0) {
      var name = this.props.params.name;
      var oneshop = [{name: "Loading...", key: "Loading..."}];
    }
    else {
      var props = this.props.shop;
      var name = this.props.params.name;
      var oneshop = _.find(props, function(o) { return o.name == name; });
    }

    return (
      <div>
        <div>
          <h1>Shop: <b>{oneshop.name}</b></h1>
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

const FetchOneShop = fetch(Shop, {
  actions: [fetchOneShop]
});


function mapStateToProps(state) {
  const shop = state.shops;
  return { shop };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchOneShop: bindActionCreators(fetchOneShop, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchOneShop);
