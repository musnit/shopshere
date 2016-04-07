import * as types from '../constants/ActionTypes';
import fetchShopsAPI from '~/src/helpers/fetchShopsAPI';
import fetchOneShopAPI from '~/src/helpers/fetchOneShopAPI';
import addShopAPI from '~/src/helpers/addShopAPI';
import deleteShopAPI from '~/src/helpers/deleteShopAPI';
import { apiClient } from '../services/ApiClient.js';
import request from 'superagent';
import config from '../config';

//action creators:
export function unboundAddShop(data) {
  return {
    type: types.ADD_SHOP,
    payload: {
      promise: addShopAPI(data)
    }
  }
};

export function fetchShops(options) {
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fetchShopsAPI()
    }
  }
};

export function fetchOneShop(name) {
  const nameForFetch = name.params["name"];
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fetchOneShopAPI(nameForFetch)
    }
  }
};

export function unboundDeleteShop(object) {
  return {
    type: types.DELETE_SHOP,
    payload: {
      promise: deleteShopAPI(object)
    }
  }
}