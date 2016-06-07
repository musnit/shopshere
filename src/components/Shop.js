import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Viewpoints from '~/src/components/Viewpoints';
import Products from '~/src/components/Products';
import Admin from '~/src/components/Admin';
import { Tabs, Tab } from 'react-bootstrap';
import { find } from 'lodash';


class Shop extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var name = this.props.params.name;

    var shopID;

    if(typeof this.props.shops != "undefined" && this.props.shops != null && this.props.shops.length > 0){
      shopID = _.find(this.props.shops, function(o){ return o.name == name }).id;
    }
    else {
      shopID = 0;
    }

    return (
      <div>
        <div>
          <h1>Shop: <b>{name}</b></h1>
        </div>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Viewpoints">
            <Viewpoints shopID={shopID} />
          </Tab>
          <Tab eventKey={2} title="Products">
            <Products shopID={shopID} />
          </Tab>
          <Tab eventKey={3} title="Admin">
            <Admin shopID={shopID} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = state.shops;
  return { shops };
}

export default connect(mapStateToProps)(Shop);
