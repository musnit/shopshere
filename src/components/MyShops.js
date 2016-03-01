import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from '../helpers/componentHelpers';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput } from 'react-bootstrap';
import Navbar from '../Navbar.js';

class MyShops extends Component {

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

      
        
      <div>
      
      <h1> Welcome <em>{user.username}</em></h1>
      
      
       <h2> Add a new shop: </h2>
      
      <label for="inputShopName" class="sr-only">Shop Name</label>
        
      <input type="ShopName" placeholder="Shop Name..." required />
      
      <button>Add a shop</button>
      
      <h2> List of your shops: </h2>
      <ul>
      {myShops.map(shop => 
          <li>
        {shop.name}
      </li>
    
    )}
           
        </ul>


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

export default connect(mapStateToProps)(MyShops);
