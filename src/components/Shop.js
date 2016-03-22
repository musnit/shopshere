import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../Navbar.js';
import { bindActionCreators } from 'redux';
import { fetchOneShop } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
import MyViewpoints from '~/src/components/MyViewpoints';

class Shop extends Component {

   componentWillMount() {

  	console.log("Here");

    console.log(this.props.shop);
  }

  componentDidMount() {
    
    console.log("Here");

    console.log(this.props.shop);
  }


  render() {
    return (
      <div>
          <Navbar> </Navbar>
          <div> 
              {this.props.shop.map((shop) => 
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
