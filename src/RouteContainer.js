import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import { bindActionCreators } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Welcome from './Welcome';
import Viewer from './components/Viewer';
import ViewerWidget from './components/ViewerWidget';
import Shops from './components/Shops';
import Shop from './components/Shop';
import Navbar from './Navbar.js';
import App from './App.js';
import Home from './components/user/Home.js';
import Login from './components/Login.js';
import DirectoryList from './components/user/DirectoryList.js';
import CategoryShopList from './components/user/CategoryShopList.js';
import ManageCategories from '~/src/components/categories/ManageCategories.js';



class RouteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: syncHistoryWithStore(browserHistory, this.props.store)
    };
  }

  checkAuth(nextState, replace) {
    let secret = window.localStorage.getItem('secretKey');
    if (secret === null) {
      replace('/login');
    }
  }

  render() {
    return (
      <Router ref="router" history={ this.state.history }>
        <Redirect from="/user" to="/user/directory" />
        <Redirect from="/" to="/shops" />
        <Route path="/login" component={ Login }>
        </Route>
        <Route path="/" component={ App } onEnter={this.checkAuth}>
          <Route path="/viewer" component={ Viewer }>
          </Route>
          <Route path="/viewerwidget" component={ ViewerWidget }>
          </Route>
          <Route path="/shops" component={ Shops }>
            <Route path="/shops/:name" component={ Shop }>
            </Route>
          </Route>
          <Route path="/categories" component={ ManageCategories }>
          </Route>
          <Route path="/user" component={ Home }>
            <Route path="/user/directory" component={ DirectoryList }>
            </Route>
            <Route path="/user/:category" component={ CategoryShopList }>
            </Route>
          </Route>
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
