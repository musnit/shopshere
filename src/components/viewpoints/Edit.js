import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { Input, ButtonInput, Modal, Button, Radio, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image, Alert } from 'react-bootstrap';
import { fetchViewpoints, clearViewpoints, deleteViewpoint, unboundPatchViewpoint } from '~/src/actions/viewpoints';
import '~/src/styles/viewpoint.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { viewpointFolderURL } from '~/src/config';

import Confirm from '~/src/components/utility/Confirm';

class Edit extends Component {

  clickedPatchViewpoint() {

    var shortCircuit = 0;

    var name = this.refs.nameBox.getValue();

    if (name == "") {
      this.handleAlertNoNameShow();
      shortCircuit = 1;
    } else {
      this.handleAlertNoNameDismiss();
    }

    var image;

    if (this.state.imageFile) {
      image = this.state.imageFile;
      this.handleAlertNoViewImageDismiss();
    } else if (this.state.clickedChange) {
      this.handleAlertNoViewImageShow();
      shortCircuit = 1;
    } else {
      image = this.state.selectedViewpoint.imageFile;
      this.handleAlertNoViewImageDismiss();
    }

    var thumbnail;

    if (this.state.thumbnailFile) {
      thumbnail = this.state.thumbnailFile;
      this.handleAlertNoThumbnailDismiss();
    } else if (this.state.clickedChangeThumbnail) {
      this.handleAlertNoThumbnailShow();
      shortCircuit = 1;
    } else {
      thumbnail = this.state.selectedViewpoint.thumbnailFile;
      this.handleAlertNoThumbnailDismiss();
    }

    if (shortCircuit == 1) {
      return;
    }



    var patchObject = {
      id: this.state.selectedViewpoint.id,
      name: name,
      imageFile: image,
      thumbnailFile: thumbnail,
      shop: this.props.shopID
    }

    this.props.boundPatchViewpoint(patchObject);

    this.setState({
      showModal: false,
      submitDisabled: false,
      imageFile: undefined,
      thumbnailFile: undefined,
      changeImage: false,
      changeThumbnail: false,
      alertNoNameVisible: false,
      alertNoViewImageVisible: false,
      alertNoThumbnailVisible: false,
      clickedChange: false,
      clickedChangeThumbnail: false,
    });
  }

  componentWillUnmount() {
    this.props.clearViewpoints();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shopID !== this.props.shopID) {
      this.props.clearViewpoints();
      this.props.fetchViewpoints({
        shopID: nextProps.shopID
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedViewpoint: {
        name: "",
        imageFile: "",
        thumbnailFile: "",
      },
      changeImage: false,
      changeThumbnail: false,
      imageFile: undefined,
      thumbnailFile: undefined,
      alertNoNameVisible: false,
      alertNoViewImageVisible: false,
      alertNoThumbnailVisible: false,
      confirmModalVisible: false
    };
  }

  clickedDeleteViewpoint() {
    this.setState({
      confirmModalVisible: true,
    });
  }

  closeConfirm() {
    this.setState({
      confirmModalVisible: false,
    });
  }

  confirmDeleteViewpoint() {
    let deleteObject = {
      ID: this.state.selectedViewpoint.id,
      index: this.state.selectedViewpoint.index
    };

    this.props.deleteViewpoint(deleteObject);

    this.setState({
      showModal: false,
      changeImage: false,
      imageFile: undefined,
      thumbnailFile: undefined,
      confirmModalVisible: false,
      selectedViewpoint: {
        name: "",
        imageFile: "",
        thumbnailFile: "",
      }
    });
  }

  close() {
    this.setState({
      showModal: false,
      imageFile: undefined,
      changeImage: false,
      thumbnailFile: undefined,
      changeThumbnail: false,
      alertNoNameVisible: false,
      alertNoViewImageVisible: false,
      alertNoThumbnailVisible: false,
    });
  }

  open(event) {

    var clickEvent = event;

    let selected = _.find(this.props.viewpoints, function(o) {
      return o.id == clickEvent.currentTarget.attributes.data.value
    });

    let index = _.findIndex(this.props.viewpoints, function(o) {
      return o.id == clickEvent.currentTarget.attributes.data.value
    });

    selected.index = index


    this.setState({
      showModal: true,
      selectedViewpoint: selected
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

  clickedDeleteImage() {
    this.setState({
      changeImage: true,
      imageFile: undefined,
      clickedChange: true,
      resetViewpointImage: true,
    });
  }

  clickedDeleteThumbnail() {
    this.setState({
      changeThumbnail: true,
      thumbnailFile: undefined,
      clickedChangeThumbnail: true,
      resetViewpointThumbnail: true,
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

  render() {
    return (
      <div>
        <div className="view-button">
          <DropdownButton bsStyle={ 'info' } title={ 'Select a viewpoint to edit/delete' } id="viewpoint">
            { this.props.viewpoints.map((viewpoint, index) => <MenuItem eventKey={ index } key={ index } data={ viewpoint.id } onClick={ this.open.bind(this) }>
                                                              { viewpoint.name } </MenuItem>
              ) }
          </DropdownButton>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) } backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit viewpoint:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="inputViewpointName">Viewpoint Name</label>
            <Input id="inputViewpointName" type="text" ref='nameBox' defaultValue={ this.state.selectedViewpoint.name } placeholder="Name..." required />
            { this.state.alertNoNameVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoNameDismiss.bind(this) }>
                <p>Viewpoint name is required.</p>
              </Alert> : null }
            <label htmlFor="inputViewpointImageFile">360° Viewpoint Image</label>
            <br/>
            { !this.state.changeImage ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 12 } md={ 6 }>
                    <Image src={ this.state.selectedViewpoint.imageFile } responsive />
                    </Col>
                    <Col xs={ 12 } md={ 6 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove image.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteImage.bind(this) }>Change Image</Button>
                      </OverlayTrigger>
                    </div>
                    </Col>
                  </Row>
                </div>
              </Grid>
              :
              <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } reset={ this.state.resetViewpointImage } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ viewpointFolderURL } /> }
            { this.state.imageFile ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 12 } md={ 6 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove image.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteImage.bind(this) }>Change Image</Button>
                      </OverlayTrigger>
                    </div>
                    </Col>
                  </Row>
                </div>
              </Grid> : null }
            { this.state.alertNoViewImageVisible ?
              <Alert bsStyle="danger" onDismiss={ this.handleAlertNoViewImageDismiss.bind(this) }>
                <p>Viewpoint 360° Image is required.</p>
              </Alert> : null }
            <br/>
            <label htmlFor="inputViewpointThumbnailFile">Viewpoint Thumbnail</label>
            <br/>
            { !this.state.changeThumbnail ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 12 } md={ 6 }>
                    <Image src={ this.state.selectedViewpoint.thumbnailFile } responsive />
                    </Col>
                    <Col xs={ 12 } md={ 6 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove thumbnail.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteThumbnail.bind(this) }>Change Thumbnail</Button>
                      </OverlayTrigger>
                    </div>
                    </Col>
                  </Row>
                </div>
              </Grid>
              :
              <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } reset={ this.state.resetViewpointThumbnail } onUploadFinish={ this.imageThumbnailUploadComplete.bind(this) } folderURL={ viewpointFolderURL } /> }
            { this.state.thumbnailFile ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 12 } md={ 6 }>
                    <div>
                      <OverlayTrigger overlay={ <Tooltip id="remove-image">Remove thumbnail.</Tooltip> }>
                        <Button bsStyle="danger" onClick={ this.clickedDeleteThumbnail.bind(this) }>Change Thumbnail</Button>
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

            <ButtonInput className="product-button b-float-left" type="submit" bsStyle="danger" onClick={ this.clickedDeleteViewpoint.bind(this) }>Delete Viewpoint</ButtonInput>

            <ButtonInput className="product-button b-float-right" type="submit" bsStyle="primary" onClick={ this.clickedPatchViewpoint.bind(this) } disabled={ this.state.submitDisabled }>
              { this.state.submitDisabled ? 'Wait for upload to finish' : 'Save Changes' }
            </ButtonInput>

          </Modal.Footer>
        </Modal>
        <Confirm visible={ this.state.confirmModalVisible } onConfirm={ this.confirmDeleteViewpoint.bind(this) } onClose={ this.closeConfirm.bind(this) } title="Confirmation" body="Are you sure you want to delete this viewpoint?"
        />
      </div>
      );
  }
}

const FetchedEdit = fetch(Edit, {
  actions: [fetchViewpoints]
});


function mapStateToProps(state) {
  const viewpoints = state.viewpoints;
  return {
    viewpoints
  };
}

function mapDispatchToProps(dispatch) {
  return {
    boundPatchViewpoint: bindActionCreators(unboundPatchViewpoint, dispatch),
    clearViewpoints: bindActionCreators(clearViewpoints, dispatch),
    fetchViewpoints: bindActionCreators(fetchViewpoints, dispatch),
    deleteViewpoint: bindActionCreators(deleteViewpoint, dispatch)
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(FetchedEdit);
