import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import { routerMiddleware, push } from 'react-router-redux'

class Login extends Component {

  login() {
    let secret = document.getElementById('password').value;
    window.localStorage.setItem('secretKey', secret);
    this.props.history.push('/');
  }

  componentDidMount() {
    window.localStorage.removeItem('secretKey');
  }

  render() {
    return (
      <div className="login-form" style= {{ position: 'absolute', left: 'calc(50% - 125px)', top: '150px' }}>
        <label>Login:</label>
        <input id='password'></input>
        <Button onClick={this.login.bind(this)}>Go!</Button>
      </div>
    )
  }
}

export default Login;
