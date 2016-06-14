import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Add from '~/src/components/categories/Add';
import Edit from '~/src/components/categories/Edit';
import BackLink from '~/src/components/categories/BackLink';
import '~/src/styles/categories.css';

class ManageCategories extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <div className="side">
            <h1>Manage Categories</h1>
          </div>
          <div className="side">
            <BackLink />
          </div>
          <br/>
          <br/>
          <Edit />
          <Add />
        </div>
    );
  }
}



function mapStateToProps(state) {
 return {};
};

function mapDispatchToProps(dispatch) {
  return {};
};

export default connect(mapStateToProps,mapDispatchToProps)(ManageCategories);