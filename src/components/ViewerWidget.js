const dummyShopID = '4f0d81dc-06dd-4bb9-bd00-279d84e7caaf';
const dummyOpenProductModal = (productObject) => { alert('Open product: ' + productObject.name)};

import React, { Component, PropTypes } from 'react';
import SphereViewer from './SphereViewer.js';
import request from 'superagent';
import { apiURL } from '~/src/config';

class ViewerWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingStore: true,
      loadingProducts: false,
      loadingViewpoints: false
    };
  }

  componentDidMount() {
    const shopID = this.props.shopID || dummyShopID;
    this.loadShop(shopID)
    .then((shop) => {
      this.setState({
        shop,
        loadingStore: false,
        loadingViewpoints: true
      });
      return this.loadViewpoints(shopID);
    })
    .then((viewpoints) => {
      const entranceViewpoint = _.find(viewpoints, (viewpoint) => {
        return viewpoint.id == this.state.shop.entranceViewpoint;
      });
      this.setState({
        viewpoints,
        currentViewpoint: entranceViewpoint,
        loadingViewpoints: false,
        loadingProducts: true
      });
      return this.loadProducts(shopID);
    })
    .then((products) => {
      this.setState({ products, loadingProducts: false, loadingHotspots: true });
      return this.loadHotspots(shopID);
    })
    .then((hotspots) => {
      this.setState({ hotspots, loadingHotspots: false });
      this.setState( {
        currentHotspots: hotspots.filter((hotspot) => {
          return hotspot.viewpoint === this.state.currentViewpoint.id;
        })
      })
      this.initializeViewer();
    });
  }

  loadShop(id) {
    return new Promise((resolve, reject) => {
      request.get(apiURL + 'shop' + '/' + id)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err || !res.ok) {
              console.log('Oh no! error' + JSON.stringify(err));
            } else {
              resolve(res.body["Items"][0]);
            }
        });
    });
  }

  loadForShop(shopID, type) {
    return new Promise((resolve, reject) => {
      request.get(apiURL + type + '?filter[shop]=' + shopID)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err || !res.ok) {
              console.log('Oh no! error' + JSON.stringify(err));
            } else {
              resolve(res.body["Items"]);
            }
        });
    });
  }

  loadProducts(shopID) {
    return this.loadForShop(shopID, 'product');
  }

  loadViewpoints(shopID) {
    return this.loadForShop(shopID, 'viewpoint');
  }

  loadHotspots(shopID) {
    return this.loadForShop(shopID, 'hotspot');
  }

  initializeViewer() {
    this.sphereViewer = new SphereViewer({
      domContainerElement: document.getElementById('viewer-placeholder'),
      openModal: this.open.bind(this),
      imageURL: this.state.currentViewpoint.imageFile
    });
    this.removeAllHotspots();
    this.addHotspotsToViewpoint(this.state.currentHotspots);
  }

  open(hotspotID) {
    const openProductModal = this.props.openProductModal || dummyOpenProductModal;
		const hotspot = _.find(this.state.currentHotspots, (hotspot) => {
      return hotspot.id == hotspotID;
    });
		if (hotspot.type === "product") {
			const product = _.find(this.state.products, (product) => {
        return product.id == hotspot.prodview
      });
      openProductModal(product);
		}
    else if (hotspot.type === "navigation") {
      const viewpoint = _.find(this.state.viewpoints, (viewpoint) => {
        return viewpoint.id == hotspot.prodview
      });
      this.navigateToViewpoint( viewpoint );
    }
  }

  navigateToViewpoint(viewpoint) {

    this.removeAllHotspots();

    this.setState({ currentViewpoint: viewpoint });

    this.changeViewpoint(viewpoint);

    var newHotspots = _.filter(this.state.hotspots, function(o){return o.viewpoint == viewpoint.id});

    this.setState({ currentHotspots: newHotspots });

    this.addHotspotsToViewpoint(newHotspots);

    
  }

  removeAllHotspots() {
    this.sphereViewer.removeHotspots.bind(this.sphereViewer);
    this.sphereViewer.removeHotspots();
  }

  addHotspotsToViewpoint(hotspots){
    var addAHotspot = this.sphereViewer.addAHotspot.bind(this.sphereViewer);
    _.forEach(hotspots, (o) => { addAHotspot(o); });
  }

  changeViewpoint(viewpoint){
    var imageURL = viewpoint.imageFile;
    this.sphereViewer.changeBackgroundImage.bind(this.sphereViewer);
    this.sphereViewer.changeBackgroundImage(imageURL);
  }

  render() {
    const loadingStore = this.state.loadingStore && <div>Loading store...</div>;
    const loadingProducts = this.state.loadingProducts && <div>Loading products...</div>;
    const loadingViewpoints = this.state.loadingViewpoints && <div>Loading viewpoints...</div>;
    const loadingHotspots = this.state.loadingHotspots && <div>Loading hotspots...</div>;
    return (
      <div id='viewer-widget'>
        {loadingStore}
        {loadingProducts}
        {loadingViewpoints}
        {loadingHotspots}
        <div id='viewer-placeholder'></div>
      </div>
    );
  }
};

export default ViewerWidget;
