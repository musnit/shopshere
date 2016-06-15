import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { Input, ButtonInput, Modal, Button, Radio, DropdownButton, MenuItem, Grid, Row, Col, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { fetchViewpoints, clearViewpoints, deleteViewpoint, unboundPatchViewpoint } from '~/src/actions/viewpoints';
import '~/src/styles/viewpoint.css';

import S3Uploader from '~/src/components/utility/S3Uploader';

import { viewpointFolderURL } from '~/src/config';

class Edit extends Component {

  clickedPatchViewpoint() {

    var image;

    if (this.state.imageFile) {
      image = this.state.imageFile;
    } else {
      image = this.state.selectedViewpoint.imageFile;
    }

    var name = this.refs.nameBox.getValue();

    var patchObject = {
      id: this.state.selectedViewpoint.id,
      name: name,
      imageFile: image,
      shop: this.props.shopID
    }

    this.props.boundPatchViewpoint(patchObject);

    this.setState({
      showModal: false,
      submitDisabled: false,
      imageFile: undefined,
      changeImage: false
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
        imageFile: ""
      },
      changeImage: false,
      imageFile: undefined
    };
  }


  clickedDeleteViewpoint() {
    let deleteObject = {
      ID: this.state.selectedViewpoint.id,
      index: this.state.selectedViewpoint.index
    };

    this.props.deleteViewpoint(deleteObject);

    this.setState({
      showModal: false,
      changeImage: false,
      imageFile: undefined,
      selectedViewpoint: {
        name: "",
        imageFile: ""
      }
    });
  }

  close() {
    this.setState({
      showModal: false,
      imageFile: undefined,
      changeImage: false,
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
      imageFile: imageFile
    });
  }

  clickedDeleteImage() {
    this.setState({
      changeImage: true
    });
  }



  render() {
    return (
      <div>
        <div className="view-button">
          <DropdownButton bsStyle={ 'primary' } title={ 'Select a viewpoint to edit/delete' } id="viewpoint">
            { this.props.viewpoints.map((viewpoint, index) => <MenuItem eventKey={ index } key={ index } data={ viewpoint.id } onClick={ this.open.bind(this) }>
                                                              { viewpoint.name } </MenuItem>
              ) }
          </DropdownButton>
        </div>
        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Edit viewpoint:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="inputViewpointName">Viewpoint Name</label>
            <Input type="ViewpointName" ref='nameBox' defaultValue={ this.state.selectedViewpoint.name } placeholder="Name..." required />
            <label htmlFor="inputViewpointImageFile">Viewpoint Image</label>
            <br/>
            { !this.state.changeImage ?
              <Grid fluid>
                <div>
                  <Row className="padded-row">
                    <Col xs={ 8 } md={ 8 }>
                    <Image src={ this.state.selectedViewpoint.imageFile } responsive />
                    </Col>
                    <Col xs={ 1 } md={ 1 }>
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
              <S3Uploader onUploadStart={ this.imageUploadStarted.bind(this) } onUploadFinish={ this.imageUploadComplete.bind(this) } folderURL={ viewpointFolderURL } /> }
          </Modal.Body>
          <Modal.Footer>
            <Grid fluid>
              <Row className="padded-row">
                <Col xs={ 6 } md={ 4 }>
                <ButtonInput className="product-button" type="submit" bsStyle="danger" onClick={ this.clickedDeleteViewpoint.bind(this) }>Delete viewpoint</ButtonInput>
                </Col>
                <Col xs={ 6 } md={ 4 }>
                <ButtonInput className="product-button" type="submit" bsStyle="primary" onClick={ this.clickedPatchViewpoint.bind(this) } disabled={ this.state.submitDisabled }>
                  { this.state.submitDisabled ? 'Wait for upload to finish' : 'Edit viewpoint' }
                </ButtonInput>
                </Col>
              </Row>
            </Grid>
          </Modal.Footer>
        </Modal>
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