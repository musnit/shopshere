import * as types from '../constants/ActionTypes';
import { connectProductToHotspotAPI, deleteHotspotAPI, fetchHotspotsAPI, addHotspotAPI, patchHotspotAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function connectProductToHotspot(data) {
  return {
    type: types.CONNECT_PRODUCT_TO_HOTSPOT,
    payload: {
      promise: connectProductToHotspotAPI(data)
    }
  }
}
;

export function deleteHotspot(object) {
  return {
    type: types.DELETE_HOTSPOT,
    payload: {
      promise: deleteHotspotAPI(object)
    }
  }
}

export function fetchHotspots(options) {
  const shopID = options.shopID;
  const viewpointID = options.viewpointID;
  return {
    type: types.FETCH_HOTSPOTS,
    payload: {
      promise: fetchHotspotsAPI(shopID, viewpointID)
    }
  }
}
;

export function unboundAddHotspot(data) {
  return {
    type: types.ADD_HOTSPOT,
    payload: {
      promise: addHotspotAPI(data)
    }
  }
}
;

export function clearHotspots() {
  return {
    type: types.CLEAR_HOTSPOTS
  }
}
;

export function unboundPatchHotspot(data) {
  return {
    type: types.EDIT_HOTSPOT,
    payload: {
      promise: patchHotspotAPI(data)
    }
  }
}
;