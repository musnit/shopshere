import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { unboundAddProduct } from '~/src/actions/products';
import { filter, cloneDeep, forEach, pull } from 'lodash';
import ColorPick from '~/src/components/utility/ColorPick';
import S3Uploader from '~/src/components/utility/S3Uploader';
import { productFolderURL } from '~/src/config';
import Add from '~/src/components/products/Add';
import '~/src/styles/product.css';



class AddProductButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  open() {
    this.setState({
      visible: true
    });
  }

  close() {
    this.setState({
      visible: false
    });
  }


  render() {
    return (
      <div>
        <div className="product-button">
          <Button bsStyle="primary" bsSize="large" onClick={ this.open.bind(this) }>
            <span className="b-button-icon glyphicons plus"></span>
            <span className="b-button-text">Add a new product</span>
          </Button>
        </div>
        <Add shopID={ this.props.shopID } visible={ this.state.visible } onClose={ this.close.bind(this) } />
      </div>
      );
  }
}



export default AddProductButton;
