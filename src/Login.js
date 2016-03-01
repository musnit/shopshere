import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, ButtonInput } from 'react-bootstrap';

class Login extends Component {


  render() {
    return (
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
  }
}

export default Login;