import * as types from '../constants/ActionTypes';
import { connectProductToHotspotAPI, deleteHotspotAPI, fetchHotspotsAPI } from '~/src/helpers/ClientAPI';

//action creators:
export function connectProductToHotspot(data) {
    return {
        type: types.CONNECT_PRODUCT_TO_HOTSPOT,
        payload: {
            promise: connectProductToHotspotAPI(data)
        }
    }
};

export function deleteHotspot(object) {
    return {
        type: types.DELETE_HOTSPOT,
        payload: {
            promise: deleteHotspotAPI(object)
        }
    }
}

export function fetchHotspots(options) {
    const shop = options.data[0];
    const viewpoint = options.data[1];
    return {
        type: types.FETCH_HOTSPOTS,
        payload: {
            promise: fetchHotspotsAPI( shop, viewpoint )
        }
    }
};

export function unboundAddHotspot(data) {
    return {
        type: types.ADD_HOTSPOT,
        payload: {
            promise: addHotspotAPI(data)
        }
    }
};

export function clearHotspots() {
    return {
        type: types.CLEAR_HOTSPOTS
    }
};