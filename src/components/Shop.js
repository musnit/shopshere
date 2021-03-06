import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';
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
    var thisShop;

    if (typeof this.props.shops != "undefined" && this.props.shops != null && this.props.shops.length > 0) {
      thisShop = _.find(this.props.shops, function(o) {
        return o.name == name
      });
      shopID = thisShop.id;
    } else {
      thisShop = {};
      shopID = 0;
    }

    return (
      <div>
        <div>
          <h1>{ name }</h1>
        </div>
        <Tabs defaultActiveKey={ 1 }>
          <Tab eventKey={ 1 } title="Viewpoints">
            <Viewpoints shopID={ shopID } thisShop={ thisShop } />
          </Tab>
          <Tab eventKey={ 2 } title="Products">
            <Products shopID={ shopID } />
          </Tab>
          <Tab eventKey={ 3 } title="Admin">
            <Admin shopID={ shopID } />
          </Tab>
        </Tabs>
      </div>
      );
  }
}

const FetchedShop = fetch(Shop, {
  actions: [fetchShops]
});


function mapStateToProps(state) {
  const shops = state.shops;
  return {
    shops
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShops: bindActionCreators(fetchShops, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedShop);
