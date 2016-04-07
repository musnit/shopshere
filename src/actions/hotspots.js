import * as types from '../constants/ActionTypes';
import connectProductToHotspotAPI from '~/src/helpers/connectProductToHotspotAPI';
import deleteHotspotAPI from '~/src/helpers/deleteHotspotAPI';
import fetchHotspotsAPI from '~/src/helpers/fetchHotspotsAPI';


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
    type: types.DELETE_HOTSPOT,
    payload: {
      promise: deleteHotspotAPI(object)
    }
  }
}

export function fetchHotspots(options) {

  const nameForFetch = options.data; 

  return {
    type: types.FETCH_HOTSPOTS,
    payload: {
      promise: fetchHotspotsAPI(nameForFetch)
    }
  }
};