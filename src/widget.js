import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ViewerWidget from './components/ViewerWidget';

window.createSphereWidget = (shopID, callbacks, domElementID, width, height) => {
  callbacks = callbacks || {};
  render(
    <ViewerWidget
      shopID={ shopID }
      width = { width }
      height = { height }
      openProductModal={ callbacks.openProductModal }
      hoverProduct={ callbacks.hoverProduct }
      shopLoaded={ callbacks.shopLoaded }
      productsLoaded={ callbacks.productsLoaded }
      viewpointsLoaded={ callbacks.viewpointsLoaded }
      hotspotsLoaded={ callbacks.hotspotsLoaded }
      viewerInitialized={ callbacks.viewerInitialized } />,
    document.getElementById(domElementID)
  );
}
