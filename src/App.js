import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

const getCurrentUserId = (users) => {
    
    let outputId = undefined;
    
  
    for (let i = 0; i < users.length; i++){
    

    if (users[i].isCurrentUser)
      {
        outputId = users[i].userid;
      }
    
    return outputId;
  };
};

const getCurrentShopIds = (users) => {
  
  let output = [];
  
  let currentUId = getCurrentUserId(users);
  
  for (let i = 0; i < users.length; i++){
    if (users[i].userid === currentUId)
      {
        output = users[i].shops;
      }
  };
  
  return output;
};



const getMyShops = (users, shops) => {
  
  let output = [];
  
  let shopIds = getCurrentShopIds(users);



  
  for (let  i = 0; i < shops.length; i++) {
    if (shopIds.includes(shops[i].shopid))
      {
        output.push(shops[i])
      }
    };
  return output;
};


const getUser = (users) =>{
    
    let outputUser = undefined;
    
  
    for (let i = 0; i < users.length; i++){
    

    if (users[i].isCurrentUser)
      {
        outputUser = users[i];
      }
    
    return outputUser;
  };
};


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
      <div class="container">

      <form class="form-signin">
        <h2 class="form-signin-heading">Please sign in to ShopSphere</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required /> 

        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

    </div>

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

export default App;
