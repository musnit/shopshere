import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, ButtonInput, Modal, Button, Radio, Alert, Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { unboundAddViewpoint } from '~/src/actions/viewpoints';
import '~/src/styles/viewpoint.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { viewpointFolderURL } from '~/src/config';

class Add extends Component {

  clickedAddViewpoint() {

    var shortCircuit = 0;

    var viewName = this.refs.nameBox.getValue();

    if (viewName == "") {
      this.handleAlertNoNameShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoNameDismiss();
    }

    if (!this.state.imageFile) {
      this.handleAlertNoViewImageShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoViewImageDismiss();
    }

    if (!this.state.thumbnailFile) {
      this.handleAlertNoThumbnailShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoThumbnailDismiss();
    }

    if (shortCircuit == 1) {
      return;
    }

    this.props.boundAddViewpoint({
      name: this.refs.nameBox.getValue(),
      shop: this.props.shopID,
      imageFile: this.state.imageFile,
      thumbnailFile: this.state.thumbnailFile
    });
    this.refs.nameBox.getInputDOMNode().value = '';
    this.setState({
      showModal: false,
      submitDisabled: false,
      imageFile: undefined,
      thumbnailFile: undefined,
      alertNoNameVisible: false,
      alertNoViewImageVisible: false,
      alertNoThumbnailVisible: false,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      imageFile: undefined,
      alertNoNameVisible: false,
      alertNoViewImageVisible: false,
      alertNoThumbnailVisible: false,
      resetViewpointImage: false,
      resetViewpointThumbnail: false
    };
  }

  close() {
    this.setState({
      showModal: false,
      imageFile: undefined,
      thumbnailFile: undefined,
      alertNoNameVisible: false,
      alertNoViewImageVisible: false,
      alertNoThumbnailVisible: false,
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  imageUploadStarted() {
    this.setState({
      submitDisabled: true
    });
  }

  imageUploadComplete(imageFile) {
    this.setState({
      submitDisabled: false,
      imageFile: imageFile,
      resetViewpointImage: false,
    });
  }

  imageThumbnailUploadComplete(thumbnailFile) {
    this.setState({
      submitDisabled: false,
      thumbnailFile: thumbnailFile,
      resetViewpointThumbnail: false
    });
  }

  handleAlertNoNameDismiss() {
    this.setState({
      alertNoNameVisible: false
    });
  }

  handleAlertNoNameShow() {
    this.setState({
      alertNoNameVisible: true
    });
  }

  handleAlertNoViewImageDismiss() {
    this.setState({
      alertNoViewImageVisible: false
    });
  }

  handleAlertNoViewImageShow() {
    this.setState({
      alertNoViewImageVisible: true
    });
  }

  handleAlertNoThumbnailDismiss() {
    this.setState({
      alertNoThumbnailVisible: false
    });
  }

  handleAlertNoThumbnailShow() {
    this.setState({
      alertNoThumbnailVisible: true
    });
  }

  clickedDeleteImage() {
    this.setState({
      resetViewpointImage: true,
      imageFile: undefined
    });
  }

  clickedDeleteThumbnail() {
    this.setState({
      resetViewpointThumbnail: true,
      thumbnailFile: undefined
    });
  }

  render() {
    return (
      <div>
        <div className="view-button">
          <Button bsStyle="primary" bsSize="large" onClick={ this.open.bind(this) }>
            Add a new viewpoint
          </Button>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) } backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add a new viewpoint:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input label="Viewpoint Name" id="inputViewpointName" type="text" ref='nameBox' placeholder="Name..." required />
            { this.state.alertNoNameVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
                <p>Viewpoint name is required.</p>
              </Alert> : null }
            <label htmlFor="inputViewpointImageFile">360° Viewpoint Image</label>
            <br/>
            <S3Uploader id="inputViewpointImageFile" reset={ this.state.resetViewpointImage } onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ viewpointFolderURL }
            />
            { this.state.imageFile ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 1 } md={ 1 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove image.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteImage.bind(this) }>Change Image</Button>
                      </OverlayTrigger>
                    </div>
                    </Col>
                  </Row>
                </div>
              </Grid> : null }
            <br/>
            { this.state.alertNoViewImageVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoViewImageDismiss.bind(this) }>
                <p>Viewpoint 360° Image is required.</p>
              </Alert> : null }
            <label htmlFor="inputViewpointThumbnailFile">Viewpoint Thumbnail</label>
            <S3Uploader id="inputViewpointThumbnailFile" reset={ this.state.resetViewpointThumbnail } onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageThumbnailUploadComplete.bind(this) } folderURL={ viewpointFolderURL }
            />
            { this.state.thumbnailFile ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 1 } md={ 1 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove image.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteThumbnail.bind(this) }>Change Image</Button>
                      </OverlayTrigger>
                    </div>
                    </Col>
                  </Row>
                </div>
              </Grid> : null }
            { this.state.alertNoThumbnailVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoThumbnailDismiss.bind(this) }>
                <p>Viewpoint thumbnail is required.</p>
              </Alert> : null }
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput type="submit" bsStyle="primary" onClick={ this.clickedAddViewpoint.bind(this) } disabled={ this.state.submitDisabled }>
              { this.state.submitDisabled ? 'Wait for upload to finish' : 'Add viewpoint' }
            </ButtonInput>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {};
}
;

function mapDispatchToProps(dispatch) {
  return {
    boundAddViewpoint: bindActionCreators(unboundAddViewpoint, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(Add);
