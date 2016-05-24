import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '~/src/styles/directory.css';
import { fetchCategories } from '~/src/actions/categories';
import { fetchShops } from '~/src/actions/shops';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { find, sortBy, forEach } from 'lodash';
import InnerDirectory from '~/src/components/user/InnerDirectory'



class DirectoryList extends Component {

  onClick() {
  	console.log("catclick")
  }

  render() {

  	var categories = [];

  	_.forEach(this.props.categories, function(value){ categories.push([value.name,value.text])});

  	for (var i=0; i<categories.length; i++) {
  		categories[i].push(_.filter(this.props.shops, function(o) {
  			return o.category == categories[i][0]
  		}))
  	};

  	var sortcats = _.sortBy(categories, 1)

  	for (var i=0; i<sortcats.length; i++) {
  		sortcats[i][2] = _.sortBy(sortcats[i][2], 'name')
  	}


    return (
      <div className="main">

      {sortcats.map((item, index) =>
        <ul className="directory-list">
            <li eventKey={index} key={index} className="category-name" onClick={this.onClick.bind(this)}> {item[1].toUpperCase()} </li>
            <InnerDirectory data={item[2]} />
        </ul>)}





      </div>
    );
  }
}

const FetchedCats = fetch(DirectoryList, {
  actions: [fetchCategories, fetchShops]
});


function mapStateToProps(state) {
  const categories = state.categories;
  const shops = state.shops;
  return { 
  	categories,
  	shops
  	};
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchShops: bindActionCreators(fetchShops, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedCats);