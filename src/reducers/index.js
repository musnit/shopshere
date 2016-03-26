import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as types from '../constants/ActionTypes';

/* DONT:
> mutate reducer functions arguments
> perform side effects like API calls and routing transitions
> call non-pure functions
*/

///////////////////  USERS  ///////////////////

const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
				userid:action.userid,
				username:action.username,
				email:action.email,
				password:action.password,
				shops:[],
                loggedIn:false,
                isCurrentUser:false
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
			var cloneObject = Object.assign({},state);
			cloneObject.loggedIn = !action.loggedIn;
			return cloneObject;
    case 'TOGGLE_CURRENT_USER':
      if (state.userid !== action.userid) {
				return state;
			}
			var cloneObject = Object.assign({},state);
			cloneObject.isCurrentUser = !action.isCurrentUser;
			return cloneObject;
    default:
      return state;
  }
};


const users = (state=[], action) => {
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

///////////////////  SHOPS REDUCERS ///////////////////

const shop = (state,action) => {
	switch (action.type) {
      case types.ADD_SHOP_FULFILLED:
	      return action.payload;
    case 'ADD_VIEW_TO_SHOP':
      if (state.shopid !== action.shopid) {
				return state;
			}
			var cloneObject = Object.assign({},state);
			cloneObject.viewpoints.push(action.viewid)
			return cloneObject;
	    default:
	      return state;
  }
};

const shops = (state=[], action) => {
	switch (action.type) {
    case types.FETCH_SHOPS_FULFILLED:
        return action.payload;
	case types.ADD_SHOP_FULFILLED:
		return [
          ...state,
          shop(undefined, action)
          ];
	case 'ADD_VIEW_TO_SHOP':
			return state.map(t => shop(t, action));
	default:
			return state;
	}
};

///////////////////  VIEWS  ///////////////////

const viewpoint = (state, action) => {
	switch (action.type) {
		case types.ADD_VIEWPOINT_FULFILLED:
	        return action.payload;
    default:
      return state;
	}
};

const viewpoints = (state=[], action) => {
	switch (action.type) {
        case types.ADD_VIEWPOINT_FULFILLED:
			return [
	          ...state,
	          viewpoint(undefined, action)
	          ];
	    case types.FETCH_VIEWPOINTS_FULFILLED:
	        return action.payload;
	    case types.CLEAR_VIEWPOINTS:
	    	return [];
    default:
      return state;
    }
};

const rootReducer = combineReducers({
  routing: routerReducer,
  users,
  shops,
  viewpoints
});

export default rootReducer;
