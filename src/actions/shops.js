import * as types from '../constants/ActionTypes';
import fakeShopsAPI from '~/src/tests/fakeShopsAPI';

export function addShop(data) {
  return {
    type: types.ADD_SHOP,
    name: data.name,
  }
};

export function fetchShops(options) {
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fakeShopsAPI()
    }
  }
};
