import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import '~/src/styles/shops.css';



class CategoryLink extends Component {

  render() {

    return (
      <div className="add-shop-btn">
        <LinkContainer to={ { pathname: `/categories` } }>
          <Button bsStyle="primary" bsSize="large">
            Manage Categories
          </Button>
        </LinkContainer>
      </div>
    )

  }

}

export default CategoryLink;