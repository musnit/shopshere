import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ViewerWidget from './components/ViewerWidget';

window.createSphereWidget = (shopID, openProductModal, domElementID) => {
  render(
    <ViewerWidget shopID={shopID} openProductModal={openProductModal} />,
    document.getElementById(domElementID)
  );
}
