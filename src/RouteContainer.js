import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';
import Viewer from './components/Viewer';
import MyShops from './components/MyShops';
import Shop from './components/Shop';

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
        <Route path="/viewer" component={Viewer}>
        </Route>
        <Route path="/myshops" component={MyShops}>
        </Route>
        <Route path="/myshops/:name" component={Shop}>
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
