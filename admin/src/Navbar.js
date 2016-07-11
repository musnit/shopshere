import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addShop } from '~/src/actions/shops';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


class Navbar extends Component {
  render() {
    return (
	  <Nav bsStyle="pills">
	    <LinkContainer to={{ pathname: '/myshops' }}><NavItem> My Shops</NavItem></LinkContainer>
	    <LinkContainer to={{ pathname: '/viewer' }}><NavItem> Viewer </NavItem></LinkContainer>
	  </Nav>
	)
  }
}



export default Navbar;
