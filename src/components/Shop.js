import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchOneShop } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import MyViewpoints from '~/src/components/MyViewpoints';
import MyProducts from '~/src/components/MyProducts';
import { find } from 'lodash';

class Shop extends Component {

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
      var oneshop = [_.find(props, function(o) { return o.name == name; })];
    }

    return (
      <div>
          <div> 
              {oneshop.map((shop, index) =>
              <div key={index}>
                <h1> PAGE FOR <b>{shop.name}</b></h1>
                <h2> KEY: <i>{shop.key}</i></h2>
              </div>
              )}
              <br></br>
          </div>

      <MyViewpoints data={name}></MyViewpoints>

      <br></br>

      <MyProducts data={name}></MyProducts>
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
