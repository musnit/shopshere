import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { FormControl, ButtonInput, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { unboundPatchShop } from '~/src/actions/shops';
import '~/src/styles/shops.css';


class checkInvisibleShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: "Visible",
    };

  }



  checkedBox(selected, event) {

    var patchShopObject = {
      id: selected.id,
      visible: event.target.checked
    };

    this.props.boundPatchShop(patchShopObject);
  }

  render() {

    var shopID;
    var selected;

    var label;

    if (this.props.shops.length == 0 || this.props.shopID == 0) {
      selected = {
        name: "Loading..."
      };
    } else {
      shopID = this.props.shopID;

      selected = _.find(this.props.shops, function(o) {
        return o.id == shopID;
      });

    }

    if (selected.visible) {
      label = "Visible"
    } else {
      label = "Hidden"
    }


    return (
      <div className="checkbox">
        <input id="checkbox" type="checkbox" onChange={ this.checkedBox.bind(this, selected) } checked={ selected.visible } />
        <label htmlFor="checkbox">
          <b>{ label }</b>
        </label>
      </div>
      );
  }
}

function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  return {
    categories,
    shops
  };
}
;

function mapDispatchToProps(dispatch) {
  return {
    boundPatchShop: bindActionCreators(unboundPatchShop, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(checkInvisibleShop);
