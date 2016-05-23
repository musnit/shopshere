import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '~/src/styles/directory.css';
import { fetchCategories } from '~/src/actions/categories';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';


class DirectoryList extends Component {



  onClick() {
  	console.log("catclick")
  }

  render() {
    return (
      <div className="main">

      {this.props.categories.map((category, index) =>
            <h4 eventKey={index} key={index} className="category-name" onClick={this.onClick.bind(this)}> {category.text.toUpperCase()} </h4>
                )}

      </div>
    );
  }
}

const FetchedCats = fetch(DirectoryList, {
  actions: [fetchCategories]
});


function mapStateToProps(state) {
  const categories = state.categories;
  return { categories };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedCats);