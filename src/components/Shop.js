import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../Navbar.js';
import { bindActionCreators } from 'redux';
import { fetchOneShop } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';

class Shop extends Component {

  componentDidMount() {
  	const name = this.props.params.name

  	console.log("NAME: " + name)
  }

  render() {
    return (
      <div>
          <Navbar> </Navbar>
          <div>
              <h1> PAGE FOR SHOP</h1>
              <br></br>
          </div>
      </div>
    );
  }
}

const FetchOneShop = fetch(Shop, {
  actions: [fetchOneShop]
});


function mapStateToProps(state) {
  const shops = state.shops;
  return { shops };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchOneShop: bindActionCreators(fetchOneShop, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchOneShop);
