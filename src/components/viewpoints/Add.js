import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button} from 'react-bootstrap';
import { unboundAddViewpoint } from '~/src/actions/viewpoints';

class Add extends Component {

  clickedAddViewpoint() {
    this.props.boundAddViewpoint({
      name: this.refs.nameBox.getValue(),
      key: this.refs.keyBox.getValue(),
      shop: this.props.data,
      imageFile: this.refs.imageFileBox.getValue()
    });
    this.refs.nameBox.getInputDOMNode().value = '';
    this.refs.keyBox.getInputDOMNode().value = '';
    this.refs.imageFileBox.getInputDOMNode().value = '';
    this.setState({ showModal: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open.bind(this)}
        >
          Add a new viewpoint
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new viewpoint:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <label htmlFor="inputViewpointName">Viewpoint Name</label>
          <Input type="ViewpointName" ref='nameBox' placeholder="Name..." required />
          <label htmlFor="inputViewpointKey">Viewpoint Key</label>
          <Input type="ViewpointKey" ref='keyBox' placeholder="Key..." />
          <label htmlFor="inputViewpointImageFile">Viewpoint Image</label>
          <Input type="ViewpointImageFile" ref='imageFileBox' placeholder="Image..." />


          </Modal.Body>
          <Modal.Footer>
          <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedAddViewpoint.bind(this)} >Add viewpoint</ButtonInput>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    boundAddViewpoint: bindActionCreators(unboundAddViewpoint, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Add);
