import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '~/src/styles/directory.css';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { find, sortBy, forEach } from 'lodash';


class InnerDirectory extends Component {

  onClick() {
    console.log("shopclick")
  }

  render() {




    return (
      
      <div>
        {this.props.data.map((item, index) =>
              <li eventKey={index} key={index} className="shop-name" onClick={this.onClick.bind(this)}> {item["name"]} </li>)}
      </div>



      
    );
  }
}

export default InnerDirectory;