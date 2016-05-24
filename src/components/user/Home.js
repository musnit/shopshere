import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '~/src/components/user/Header'



class Home extends Component {
  render() {
    return (
      <div className='container'>

        <Header />

          <div>
            {this.props.children}
          </div>


      </div>
    );
  }
}

export default Home;

