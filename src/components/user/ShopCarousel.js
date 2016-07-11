import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import fetch from '~/src/components/fetch';
import { fetchAllViewpoints } from '~/src/actions/viewpoints';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { filter } from 'lodash';
import '~/src/styles/carousel.css';



class ShopCarousel extends Component {

   constructor(props) {
    super(props);
     }

  render() {

    var shopName = this.props.data.name;

    var viewpointsPerShop = _.filter(this.props.viewpoints, function(o){
      return o.shop == shopName;
    });

    return (
      <div>
        <h1 className="shop-title"> {this.props.data.name} </h1>
        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <Thumbnail className="thumbnail-custom" href="#" alt="171x180" src={this.props.data.logoFile} />
            </Col>
            {viewpointsPerShop.map((viewpoint, index) =>
              <Col key={index} xs={6} md={3}>
                <div className="custom-thumbnail">
               <Thumbnail  href="#" alt="" src={this.props.data.logoFile} />
               
               <h2><span>{viewpoint.name.toUpperCase()}</span></h2>
               </div>
              </Col>
            )}
          </Row>
      </Grid>
      </div>
    );
  }
}

const FetchedShopCarousel = fetch(ShopCarousel, {
  actions: [fetchAllViewpoints]
});


function mapStateToProps(state) {
  const viewpoints = state.viewpoints;
  return { viewpoints };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchAllViewpoints: bindActionCreators(fetchAllViewpoints, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedShopCarousel);
