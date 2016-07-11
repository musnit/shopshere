import * as types from '../constants/ActionTypes';
import { fetchCategoriesAPI, addCategoryAPI, patchCategoryAPI, deleteCategoryAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function fetchCategories() {
  return {
    type: types.FETCH_CATEGORIES,
    payload: {
      promise: fetchCategoriesAPI()
    }
  }
}
;

export function addCategory(data) {
  return {
    type: types.ADD_CATEGORY,
    payload: {
      promise: addCategoryAPI(data)
    }
  }
}
;

export function unboundPatchCategory(data) {
  return {
    type: types.EDIT_CATEGORY,
    payload: {
      promise: patchCategoryAPI(data)
    }
  }
}
;

export function deleteCategory(object) {
  return {
    type: types.DELETE_CATEGORY,
    payload: {
      promise: deleteCategoryAPI(object)
    }
  }
}
;
