import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '~/src/components/user/Header'
import DirectoryList from '~/src/components/user/DirectoryList'


class Home extends Component {
  render() {
    return (
      <div className='container'>

        <Header />

        <DirectoryList />


      </div>
    );
  }
}

export default Home;

