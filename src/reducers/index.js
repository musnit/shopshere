import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

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
			var cloneObject = Object.assign({},state);
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

///////////////////  SHOPS  ///////////////////

const shop = (state,action) => {
	switch (action.type) {
	    case 'ADD_SHOP':
	      return {
					shopid:action.shopid,
					name:action.name,
					views:[]
				};
    case 'ADD_VIEW_TO_SHOP':
      if (state.shopid !== action.shopid) {
				return state;
			}

			var cloneObject = Object.assign({},state);
			cloneObject.views.push(action.viewid)
			return cloneObject;
	    default:
	      return state;
  }
};

const shops = (state=[], action) => {
	switch (action.type) {
		case 'ADD_SHOP':
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

const view = (state, action) => {
	switch (action.type) {
		case 'ADD_VIEW':
			return {
				viewid:action.viewid,
				imageURL:action.imageURL
			};
    default:
      return state;
	}
};

const views = (state=[], action) => {
	switch (action.type) {
		case 'ADD_VIEW':
			return [
              ...state,
              view(undefined, action)
              ];
    default:
      return state;
    }
};

const rootReducer = combineReducers({
  routing: routerReducer,
  users,
  shops,
  views
});

export default rootReducer;
