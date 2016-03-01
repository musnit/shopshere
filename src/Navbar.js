import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addShop } from '~/src/actions/shops';
import { Nav, NavItem } from 'react-bootstrap';


class Navbar extends Component {
  render() {
    return (
	  <Nav bsStyle="pills">
	    <NavItem eventKey={1} href="/"> Home </NavItem>
	    <NavItem eventKey={2} href="/login"> Login </NavItem>
	    <NavItem eventKey={3} href="/myshops"> My Shops</NavItem>
	    <NavItem eventKey={3} href="/viewer"> Viewer </NavItem>
	  </Nav>
	)
  }
}



export default Navbar;
