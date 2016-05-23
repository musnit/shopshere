import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '~/src/components/Header'
import DirectoryList from '~/src/components/DirectoryList'

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