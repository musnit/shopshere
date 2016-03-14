import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';
import Login from './Login';
import Example from './components/Example';
import ExampleTwo from './components/ExampleTwo';
import Viewer from './components/Viewer';
import MyShops from './components/MyShops';
import MyShopsFetchShops from './components/MyShopsFetchShops';

class RouteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { history: syncHistoryWithStore(browserHistory, this.props.store) };
  }

  render() {
    return (
      <Router ref="router" history={this.state.history}>
        <Route path="/" component={App}>
        </Route>
        <Route path="/login" component={Login}>
        </Route>
        <Route path="/example" component={Example}>
        </Route>
        <Route path="/exampletwo" component={ExampleTwo}>
        </Route>
        <Route path="/viewer" component={Viewer}>
        </Route>
        <Route path="/myshops" component={MyShops}>
        </Route>        
        <Route path="/myshopsfetchshops" component={MyShopsFetchShops}>
        </Route>  
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(undefined, mapDispatchToProps)(RouteContainer);
