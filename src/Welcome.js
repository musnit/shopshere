import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar.js';


class Welcome extends Component {
  render() {
    return (
      <div>
          <div>
              <div>
                  <h1> Welcome to ShopSphere!</h1>
              </div>
              <div>
                  <p> Your landing page here... </p>
              </div>
          </div>
      </div>
    );
  }
}

export default Welcome;
