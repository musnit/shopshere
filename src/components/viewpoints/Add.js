import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, Radio} from 'react-bootstrap';
import { unboundAddViewpoint } from '~/src/actions/viewpoints';
import '~/src/styles/viewpoint.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { viewpointFolderURL } from '~/src/config';

class Add extends Component {

  clickedAddViewpoint() {
    this.props.boundAddViewpoint({
      name: this.refs.nameBox.getValue(),
      shop: this.props.shopID,
      imageFile: this.state.imageFile
    });
    this.refs.nameBox.getInputDOMNode().value = '';
    this.setState({ showModal: false, submitDisabled: false, imageFile: undefined });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  close() {
    this.setState({ showModal: false, imageFile: undefined });
  }

  open() {
    this.setState({ showModal: true });
  }

  imageUploadStarted(){
    this.setState({ submitDisabled: true });
  }

  imageUploadComplete(imageFile){
    this.setState({ submitDisabled: false, imageFile: imageFile });
  }

  render() {
    return (
      <div>
        <div className="view-button">
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open.bind(this)}
          >
            Add a new viewpoint
          </Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new viewpoint:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <label htmlFor="inputViewpointName">Viewpoint Name</label>
          <Input type="ViewpointName" ref='nameBox' placeholder="Name..." required />

          <label htmlFor="inputViewpointImageFile">Viewpoint Image</label><br/>
          <S3Uploader
            onUploadStart={this.imageUploadStarted.bind(this)}
            onUploadFinish={this.imageUploadComplete.bind(this)}
            folderURL={viewpointFolderURL}/>
          </Modal.Body>
          <Modal.Footer>
          <ButtonInput type="submit" bsStyle="primary" onClick = {this.clickedAddViewpoint.bind(this)} disabled={this.state.submitDisabled}>
            {this.state.submitDisabled? 'Wait for upload to finish' : 'Add viewpoint'}
          </ButtonInput>
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
