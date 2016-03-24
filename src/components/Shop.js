import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../Navbar.js';
import { bindActionCreators } from 'redux';
import { fetchOneShop } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import MyViewpoints from '~/src/components/MyViewpoints';
import { find } from 'lodash';

class Shop extends Component {

  render() {

    //this is to just filter out the one shop object we want
    var props = this.props.shop;
    var name = this.props.params.name;
    var oneshop = [_.find(props, function(o) { return o.name == name; })];

    return (
      <div>
          <Navbar> </Navbar>
          <div> 
              {oneshop.map((shop) => 
              <div key={shop.key}>
                <h1> PAGE FOR <b>{shop.name}</b></h1>
                <h2> KEY: <i>{shop.key}</i></h2>
              </div>
              )}
              <br></br>
          </div>

      <MyViewpoints></MyViewpoints>
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
