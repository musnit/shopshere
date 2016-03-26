import * as types from '../constants/ActionTypes';
import addViewpointAPI from '~/src/helpers/addViewpointAPI';
import fetchViewpointsAPI from '~/src/helpers/fetchViewpointsAPI';
import { apiClient } from '../services/ApiClient.js';
import request from 'superagent';
import config from '../config';

//action creators:
export function unboundAddViewpoint(data) {
  return {
    type: types.ADD_VIEWPOINT,
    payload: {
      promise: addViewpointAPI(data)
    }
  }
};

export function fetchViewpoints(options) {

  const nameForFetch = options.data; 

  return {
    type: types.FETCH_VIEWPOINTS,
    payload: {
      promise: fetchViewpointsAPI(nameForFetch)
    }
  }
};

export function clearViewpoints() {
  return {
    type: types.CLEAR_VIEWPOINTS
  }
};