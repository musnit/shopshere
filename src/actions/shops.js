import * as types from '../constants/ActionTypes';
import { fetchShopsAPI, addShopAPI, deleteShopAPI } from '~/src/helpers/ClientAPI';

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

export function unboundDeleteShop(object) {
  return {
    type: types.DELETE_SHOP,
    payload: {
      promise: deleteShopAPI(object)
    }
  }
}