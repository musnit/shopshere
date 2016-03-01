import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from './helpers/componentHelpers';
import { Input, ButtonInput } from 'react-bootstrap';


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
      <div> <h1> Welcome to ShopSphere!</h1></div>
      <hr> </hr>
      <div>
      
      <h3> Login </h3>
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in to ShopSphere</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <Input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <Input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <ButtonInput type="submit" bsStyle="primary" bsSize="large" block >Sign in</ButtonInput>
        </form>
      </div>
    );

      <hr> </hr>
      </div>
      
      
      
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
         <button>Logout</button>
              <hr> </hr>
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
