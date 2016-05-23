import * as types from '../constants/ActionTypes';
import { fetchCategoriesAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function fetchCategories() {
    return {
        type: types.FETCH_CATEGORIES,
        payload: {
            promise: fetchCategoriesAPI()
        }
    }
};
