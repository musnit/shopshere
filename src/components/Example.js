import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { addShop } from '~/src/actions/shops';

class Example extends Component {

  addShop() {

    this.props.addShop({
      name: this.refs.nameBox.value,
      key: this.refs.keyBox.value
    });
    this.refs.nameBox.value = '';
    this.refs.keyBox.value = '';
  }

  render() {
    return (
      <div className="container">
        Example 1: This adds shops when you click the button. <br/>
        Shops:
        <div>
          {this.props.shops.map((shop) => <div key={shop.id}>
            Shop - name: {shop.name}
          </div>)}
        </div>
        Name:<input ref='nameBox' />Key:<input ref='keyBox' /><button
          className = "btn btn-lg btn-primary btn-block"
          type = "submit"
          onClick = {this.addShop.bind(this)} >
          add shop!
        </button><br/>

        <Link to={'/exampletwo'}>link to example2</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = state.shops;
  return { shops };
}

//binds action creator to dispatch
function mapDispatchToProps(dispatch) {
  return {
    addShop: bindActionCreators(addShop, dispatch),
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(Example);
