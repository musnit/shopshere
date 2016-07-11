import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem, Grid, Row, Col, Alert, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import '~/src/styles/shops.css';

            

class BackLink extends Component {

render() {

	return(
            <div className="add-shop-btn">
		        <LinkContainer to={{ pathname: `/shops` }}>
		            <Button
		                bsStyle="primary"
		                bsSize="large">
		            <Glyphicon glyph="arrow-left" /> Back
		            </Button>
		        </LinkContainer >
            </div>
            )

        }

}

export default BackLink;