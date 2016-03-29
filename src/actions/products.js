import * as types from '../constants/ActionTypes';
import addProductAPI from '~/src/helpers/addProductAPI';
import fetchProductsAPI from '~/src/helpers/fetchProductsAPI';
import request from 'superagent';
import config from '../config';

//action creators:
export function unboundAddProduct(data) {
  return {
    type: types.ADD_PRODUCT,
    payload: {
      promise: addProductAPI(data)
    }
  }
};

export function fetchProducts(options) {

  const nameForFetch = options.data; 

  return {
    type: types.FETCH_PRODUCTS,
    payload: {
      promise: fetchProductsAPI(nameForFetch)
    }
  }
};

export function clearProducts() {
  return {
    type: types.CLEAR_PRODUCTS
  }
};