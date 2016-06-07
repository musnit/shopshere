const dummyShopID = '8e93ed4e-dab6-46e3-99fa-674decf69486';
const dummyOpenProductModal = (id) => { alert('Open product: ' + id)};

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
          return hotspot.viewpoint === this.state.currentViewpoint.name;
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
    debugger;
    this.sphereViewer = new SphereViewer({
      domContainerElement: document.getElementById('viewer-placeholder'),
      openModal: this.open.bind(this),
      imageURL: this.state.currentViewpoint.imageFile
    });
    this.removeAllHotspots();
    this.addHotspotsToViewpoint(this.state.currentHotspots);
  }

  open(hotspotId) {
    const openProductModal = this.props.openProductModal || dummyOpenProductModal;
		const hotspot = _.find(this.state.currentHotspots, (hotspot) => {
      return hotspot.id == hotspotId
    });
		if (hotspot.type === "product") {
			const product = _.find(this.state.products, (product) => {
        return product.id == hotspot.prodview
      });
      openProductModal(product);
		}
    else if (hotspot.type === "navigation") {
      const viewpoint = _.find(this.props.viewpoints, (viewpoint) => {
        return viewpoint.id == hotspot.prodview
      });
      this.navigateToViewpoint( viewpoint );
    }
  }

  navigateToViewpoint(viewpoint) {
    this.removeAllHotspots();
    this.props.clearHotspots();
    this.props.fetchHotspots({ data: [viewpoint.shop ,viewpoint.name] });
    this.changeViewpoint(viewpoint.id);
  }

  removeAllHotspots() {
    this.sphereViewer.removeHotspots.bind(this.sphereViewer);
    this.sphereViewer.removeHotspots();
  }

  addHotspotsToViewpoint(hotspots){
    var addAHotspot = this.sphereViewer.addAHotspot.bind(this.sphereViewer);
    _.forEach(hotspots, (o) => { addAHotspot(o); });
  }

  changeViewpoint(viewpointId){
    var viewpoint = _.find(this.props.viewpoints, (viewpoint) => {
      return viewpoint.viewpointId == viewpointId
    });
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
