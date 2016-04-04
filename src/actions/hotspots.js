import * as types from '../constants/ActionTypes';
import connectProductToHotspotAPI from '~/src/helpers/connectProductToHotspotAPI';
import deleteHotspotAPI from '~/src/helpers/deleteHotspotAPI';


//action creators:
export function connectProductToHotspot(data) {
  return {
    type: types.CONNECT_PRODUCT_TO_HOTSPOT,
    payload: {
      promise: connectProductToHotspotAPI(data)
    }
  }
};

export function deleteHotspot(object) {
  return {
    type: types.CONNECT_PRODUCT_TO_HOTSPOT,
    payload: {
      promise: deleteHotspotAPI(object)
    }
  }
}

