import * as types from '../constants/ActionTypes';
import fetchShopsAPI from '~/src/helpers/fetchShopsAPI';
import fetchOneShopAPI from '~/src/helpers/fetchOneShopAPI';
import { apiClient } from '../services/ApiClient.js';
import request from 'superagent';
import config from '../config';

//action creators:
export function addShop(data) {

  //const request = superagent;
  console.log("***");
  console.log(data);
  request.post('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/shop/')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res){
     if (err || !res.ok) {
       alert('Oh no! error');
     } else {
       alert('yay posted ' + JSON.stringify(res.body));
     }
   })

  return {
    type: types.ADD_SHOP,
    name: data.name,
  }
};

export function fetchShops(options) {
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fetchShopsAPI()
    }
  }
};

export function fetchOneShop(name) {
  const nameForFetch = name.params["name"];
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fetchOneShopAPI(nameForFetch)
    }
  }
};