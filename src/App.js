import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

class App extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to ShopSphere!</h1>
        <Link to="/login"><button>Login</button></Link>
        </div>
    );
  }
}

export default App;
