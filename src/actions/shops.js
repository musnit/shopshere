import * as types from '../constants/ActionTypes';
import { fetchShopsAPI, addShopAPI, deleteShopAPI, patchShopAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function unboundAddShop(data) {
  return {
    type: types.ADD_SHOP,
    payload: {
      promise: addShopAPI(data)
    }
  }
}
;

export function unboundPatchShop(data) {
  return {
    type: types.EDIT_SHOP,
    payload: {
      promise: patchShopAPI(data)
    }
  }
}
;

export function fetchShops(options) {
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fetchShopsAPI()
    }
  }
}
;

export function unboundDeleteShop(object) {
  return {
    type: types.DELETE_SHOP,
    payload: {
      promise: deleteShopAPI(object)
    }
  }
}