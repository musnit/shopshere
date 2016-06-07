import * as types from '../constants/ActionTypes';
import { addProductAPI, fetchProductsAPI, patchProductAPI, deleteProductAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function unboundAddProduct(data) {
    return {
        type: types.ADD_PRODUCT,
        payload: {
            promise: addProductAPI(data)
        }
    }
};

export function unboundPatchProduct(data) {
    return {
        type: types.EDIT_PRODUCT,
        payload: {
            promise: patchProductAPI(data)
        }
    }
};

export function fetchProducts(options) {

    const shopIDForFetch = options.shopID;

    return {
        type: types.FETCH_PRODUCTS,
        payload: {
            promise: fetchProductsAPI(shopIDForFetch)
        }
    }
};

export function clearProducts() {
    return {
        type: types.CLEAR_PRODUCTS
    }
};

export function deleteProduct(object) {

    return {
        type: types.DELETE_PRODUCT,
        payload: {
            promise: deleteProductAPI(object)
        }
    }
}
