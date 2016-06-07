import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { fetchViewpoints, clearViewpoints } from '~/src/actions/viewpoints';
import Viewer from '../Viewer';
import { Input, ButtonInput, Modal, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import '~/src/styles/viewpoint.css';


class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedViewpoint: false,
        };
    }

  componentWillUnmount() {
    this.props.clearViewpoints();
  }

  componentWillReceiveProps(nextProps) {
   if(nextProps.shopID !== this.props.shopID){
    this.props.clearViewpoints();
    this.props.fetchViewpoints({shopID: nextProps.shopID});
   }
  }

  clickViewpoint(name) {
    this.setState({ selectedViewpoint: name.target.innerText });
  }

  render() {

    return (
      <div className="view-button">
        <DropdownButton bsStyle={'primary'} title={'Select a viewpoint to view'} id="viewpoint">

          {this.props.viewpoints.map((viewpoints, index) =>
            <MenuItem eventKey={index} key={index} onClick={this.clickViewpoint.bind(this)}> {viewpoints.name} </MenuItem>
                )}

        </DropdownButton>

        { this.state.selectedViewpoint ? <Viewer data={[this.props.shopID,this.state.selectedViewpoint]}/> : null }
        
      </div>
    );
  }
}

const FetchedList = fetch(List, {
  actions: [fetchViewpoints]
});


function mapStateToProps(state) {
  const viewpoints = state.viewpoints;
  return { viewpoints };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchViewpoints: bindActionCreators(fetchViewpoints, dispatch),
    clearViewpoints: bindActionCreators(clearViewpoints, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedList);
