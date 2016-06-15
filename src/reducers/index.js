import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as types from '../constants/ActionTypes';

/* DONT:
> mutate reducer functions arguments
> perform side effects like API calls and routing transitions
> call non-pure functions
*/

///////////////////////  USERS  ///////////////////////

const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        userid: action.userid,
        username: action.username,
        email: action.email,
        password: action.password,
        shops: [],
        loggedIn: false,
        isCurrentUser: false
      };
    case 'ADD_SHOP_TO_USER':
      if (state.userid !== action.userid) {
        return state;
      }
      var cloneObject = Object.assign({}, state);
      cloneObject.shops.push(action.shopid)
      return cloneObject;
    case 'TOGGLE_LOGGED_IN':
      if (state.userid !== action.userid) {
        return state;
      }
      var cloneObject = Object.assign({}, state);
      cloneObject.loggedIn = !action.loggedIn;
      return cloneObject;
    case 'TOGGLE_CURRENT_USER':
      if (state.userid !== action.userid) {
        return state;
      }
      var cloneObject = Object.assign({}, state);
      cloneObject.isCurrentUser = !action.isCurrentUser;
      return cloneObject;
    default:
      return state;
  }
};


const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        user(undefined, action)
      ];
    case 'ADD_SHOP_TO_USER':
      return state.map(t => user(t, action));
    case 'TOGGLE_LOGGED_IN':
      return state.map(t => user(t, action));
    case 'TOGGLE_CURRENT_USER':
      return state.map(t => user(t, action));
    default:
      return state;
  }
};

///////////////////////  SHOPS REDUCERS ///////////////////////

const shop = (state, action) => {
  switch (action.type) {
    case types.ADD_SHOP_FULFILLED:
      return action.payload;
    case types.EDIT_SHOP_FULFILLED:
      if (state.id !== action.payload.id) {
        return state;
      }
      return action.payload;
    case 'ADD_VIEW_TO_SHOP':
      if (state.shopid !== action.shopid) {
        return state;
      }
      var cloneObject = Object.assign({}, state);
      cloneObject.viewpoints.push(action.viewid)
      return cloneObject;
    default:
      return state;
  }
};

const shops = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_SHOPS_FULFILLED:
      return action.payload;
    case types.ADD_SHOP_FULFILLED:
      return [
        ...state,
        shop(undefined, action)
      ];
    case types.EDIT_SHOP_FULFILLED:
      return state.map(t => shop(t, action));
    case types.DELETE_SHOP_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    case 'ADD_VIEW_TO_SHOP':
      return state.map(t => shop(t, action));
    default:
      return state;
  }
};

///////////////////////  VIEWS  ///////////////////////

const viewpoint = (state, action) => {
  switch (action.type) {
    case types.ADD_VIEWPOINT_FULFILLED:
      return action.payload;
    case types.EDIT_VIEWPOINT_FULFILLED:
      if (state.id !== action.payload.id) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const viewpoints = (state = [], action) => {
  switch (action.type) {
    case types.ADD_VIEWPOINT_FULFILLED:
      return [
        ...state,
        viewpoint(undefined, action)
      ];
    case types.EDIT_VIEWPOINT_FULFILLED:
      return state.map(t => viewpoint(t, action));
    case types.FETCH_VIEWPOINTS_FULFILLED:
      return action.payload;
    case types.CLEAR_VIEWPOINTS:
      return [];
    case types.DELETE_VIEWPOINT_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    default:
      return state;
  }
};

///////////////////////  PRODUCTS  ///////////////////////

const product = (state, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_FULFILLED:
      return action.payload;
    case types.EDIT_PRODUCT_FULFILLED:
      if (state.id !== action.payload.id) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_FULFILLED:
      return [
        ...state,
        product(undefined, action)
      ];
    case types.FETCH_PRODUCTS_FULFILLED:
      return action.payload;
    case types.CLEAR_PRODUCTS:
      return [];
    case types.EDIT_PRODUCT_FULFILLED:
      return state.map(t => product(t, action));
    case types.DELETE_PRODUCT_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    default:
      return state;
  }
};

///////////////////////  HOTSPOTS  ///////////////////////

const hotspot = (state, action) => {
  switch (action.type) {
    case types.ADD_HOTSPOT_FULFILLED:
      return action.payload;
    default:
      return state;
  }
};

const hotspots = (state = [], action) => {
  switch (action.type) {
    case types.ADD_HOTSPOT_FULFILLED:
      return [
        ...state,
        hotspot(undefined, action)
      ];
    case types.CLEAR_HOTSPOTS:
      return [];
    case types.FETCH_HOTSPOTS_FULFILLED:
      return action.payload;
    default:
      return state;
  }
};


/////////////////////// CATEGORIES ///////////////////////

const category = (state, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY_FULFILLED:
      return action.payload;
    case types.EDIT_CATEGORY_FULFILLED:
      debugger;
      if (state.id !== action.payload.id) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case types.ADD_CATEGORY_FULFILLED:
      return [
        ...state,
        category(undefined, action)
      ];
    case types.FETCH_CATEGORIES_FULFILLED:
      return action.payload;
    case types.EDIT_CATEGORY_FULFILLED:
      return state.map(t => category(t, action));
    case types.DELETE_CATEGORY_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    default:
      return state;
  }
};


/////////////////////// ROOT ///////////////////////

const rootReducer = combineReducers({
  routing: routerReducer,
  users,
  shops,
  viewpoints,
  products,
  hotspots,
  categories
});

export default rootReducer;