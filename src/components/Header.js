import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '~/src/styles/header.css';


class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header id="brand-header">
          <Navbar.Brand>
            <a href="#" id="brand"><img id="logo-brand" src="/images/bashbo.jpg" /></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="#" ><div id="store-directory"><img src="/images/shop.jpg" />Store Directory</div></NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;