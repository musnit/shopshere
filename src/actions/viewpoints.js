import * as types from '../constants/ActionTypes';
import { addViewpointAPI, fetchViewpointsAPI, fetchAllViewpointsAPI } from '~/src/helpers/ClientAPI';

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

    var nameForFetch;

    if (typeof(options.data) == "string") {
        nameForFetch = options.data;
    }
    else {
        nameForFetch = options.data.name;
    }

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

export function fetchAllViewpoints() {
    return {
        type: types.FETCH_VIEWPOINTS,
        payload: {
            promise: fetchAllViewpointsAPI()
        }
    }
};
