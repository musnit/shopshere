import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchShops } from '~/src/actions/shops';
import fetch from '~/src/components/fetch';

class ExampleTwo extends Component {

  render() {
    return (
      <div className="container">
        Example 2: This is an example of getting shops from an API. The fetchShops action is automatically called
        when this route loads, loading data from the API and showing it once loaded<br/>
        Shops:
        <div>
          {this.props.shops.map((shop, index) => <div key={shop.key}>
            Shop - name: {index} {shop.name}
          </div>)}
        </div>
        <Link to={'/example'}>link to example 1</Link>
      </div>
    );
  }
}

const FetchedExampleTwo = fetch(ExampleTwo, {
  actions: [fetchShops]
});


function mapStateToProps(state) {
  const shops = state.shops;
  return { shops };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchShops: bindActionCreators(fetchShops, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedExampleTwo);
