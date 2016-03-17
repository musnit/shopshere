import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import {getCurrentUserId, getCurrentShopIds, getMyShops, getUser} from './helpers/componentHelpers';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar.js';


class App extends Component {
  render() {
    return (
      <div>
          <Navbar> </Navbar>
          <div>
              <div>
                  <h1> Welcome to ShopSphere!</h1>
              </div>
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

export default App;
