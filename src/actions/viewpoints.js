import * as types from '../constants/ActionTypes';
import { addViewpointAPI, fetchViewpointsAPI, fetchAllViewpointsAPI, deleteViewpointAPI, patchViewpointAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function unboundAddViewpoint(data) {
  return {
    type: types.ADD_VIEWPOINT,
    payload: {
      promise: addViewpointAPI(data)
    }
  }
}
;

export function fetchViewpoints(options) {

  var shopIDForFetch = options.shopID;

  return {
    type: types.FETCH_VIEWPOINTS,
    payload: {
      promise: fetchViewpointsAPI(shopIDForFetch)
    }
  }
}
;

export function clearViewpoints() {
  return {
    type: types.CLEAR_VIEWPOINTS
  }
}
;

export function fetchAllViewpoints() {
  return {
    type: types.FETCH_VIEWPOINTS,
    payload: {
      promise: fetchAllViewpointsAPI()
    }
  }
}
;

export function deleteViewpoint(object) {
  return {
    type: types.DELETE_VIEWPOINT,
    payload: {
      promise: deleteViewpointAPI(object)
    }
  }
}
;

export function unboundPatchViewpoint(data) {
  return {
    type: types.EDIT_VIEWPOINT,
    payload: {
      promise: patchViewpointAPI(data)
    }
  }
}
;
