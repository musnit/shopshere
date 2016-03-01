import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from './helpers/componentHelpers';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar.js';


class App extends Component {

  render() {
    

    const {
      users,
      shops,
      views
    } = this.props;

    const user = getUser(
    users);
    
    const myShops = getMyShops(
      users,
      shops
    );
    
    return (
<div>
      <Navbar> </Navbar>
    
	<div>
      <div> <h1> Welcome to ShopSphere!</h1></div>

      <div>
      <p> Your landing page here... </p>
      </div>
      
      
        
      <div>
      
        <Button type="submit" bsStyle="info" bsSize="medium" >Logout</Button>

      </div>
         </div>
         </div>
    );
  }
}

function mapStateToProps(state) {
  const users = state.users;
  const shops = state.shops;
  const views = state.views;
  return { 
    users, 
    shops, 
    views 
  };
};

export default connect(mapStateToProps)(App);
