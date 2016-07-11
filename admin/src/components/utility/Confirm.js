import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal } from 'react-bootstrap';

class Confirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible != this.props.visible && nextProps.visible == true && this.state.isOpened != true) {
      this.setState({
        isOpened: true,
      });
    } else {
      return;
    }
  }

  onClose() {
    this.setState({
      isOpened: false,
    });
    this.props.onClose();
  };

  onConfim() {
    this.setState({
      isOpened: false,
    });
    this.props.onConfirm();
  };


  render() {
    return (
      <Modal show={ this.state.isOpened } onHide={ this.onClose.bind(this) } backdrop="static">
        <Modal.Header>
          <Modal.Title>
            { this.props.title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.body }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={ this.onClose.bind(this) }>
            Cancel
          </Button>
          <Button bsStyle="danger" onClick={ this.onConfim.bind(this) }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      );
  }
}

export default Confirm;

