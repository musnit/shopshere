import request from 'superagent';

import { apiURL } from '~/src/config';
const UrlAPI = apiURL;

////////////////////////////////////// POST API /////////////////////////////////


function PostAPI(data, table) {
  data.secretKey = window.localStorage.getItem('secretKey');
  return new Promise((resolve, reject) => {
    request.post(UrlAPI + table + '/')
      .set('Content-Type', 'application/json')
      .send(data)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('Oh no! error' + JSON.stringify(err));
        } else {
          //console.log('yay posted ' + JSON.stringify(res.text));
          resolve(JSON.parse(res.text));
        }
      })
  });
}
;

export function addProductAPI(data) {
  return PostAPI(data, 'product');
}
;

export function addShopAPI(data) {
  return PostAPI(data, 'shop');

}
;

export function addViewpointAPI(data) {
  return PostAPI(data, 'viewpoint');
}
;

export function addHotspotAPI(data) {
  return PostAPI(data, 'hotspot');
}
;

export function addCategoryAPI(data) {
  return PostAPI(data, 'category');
}
;

////////////////////////////////////// DELETE API /////////////////////////////////


function DeleteAPI(object, table) {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.del(UrlAPI + table + '/' + object.ID + `?secretKey=${window.localStorage.getItem('secretKey')}`)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            //console.log('yay got ' + JSON.stringify(res.body));
            resolve({
              index: object.index
            });
          }
        })
    })();
  });
}
;

export function deleteHotspotAPI(object) {
  return DeleteAPI(object, 'hotspot');
}
;

export function deleteProductAPI(object) {
  return DeleteAPI(object, 'product');
}
;

export function deleteShopAPI(object) {
  return DeleteAPI(object, 'shop');
}
;

export function deleteCategoryAPI(object) {
  return DeleteAPI(object, 'category');
}
;

export function deleteViewpointAPI(object) {
  return DeleteAPI(object, 'viewpoint');
}
;

////////////////////////////////////// GET API /////////////////////////////////

function GetPerShopAPI(shopID, table) {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + table + '/')
        .query({
          'filter[shop]': String(shopID)
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            //console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body["Items"]);
          }
        })
    })();
  });
}

function GetPerViewpointAPI(shopID, viewpointID, table) {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + table + '/')
        .query({
          'filter[shop]': String(shopID)
        })
        .query({
          'filter[viewpoint]': String(viewpointID)
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            //console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body["Items"]);
          }
        })
    })();
  });
}

export function fetchHotspotsAPI(shopID, viewpointID) {
  return GetPerViewpointAPI(shopID, viewpointID, 'hotspot');
}
;

export function fetchProductsAPI(shopID) {
  return GetPerShopAPI(shopID, 'product');
}
;

export function fetchViewpointsAPI(shopID) {
  return GetPerShopAPI(shopID, 'viewpoint');
}
;


//// GET ALL SHOPS

export function fetchShopsAPI() {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + 'shop' + '/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            //console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body["Items"]);
          }
        })
    })();
  });
}
;

export function fetchCategoriesAPI() {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + 'category' + '/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            //console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body["Items"]);
          }
        })
    })();
  });
}
;

export function fetchAllViewpointsAPI() {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + 'viewpoint' + '/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            //console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body["Items"]);
          }
        })
    })();
  });
}
;



////////////////////////////////////// PATCH API /////////////////////////////////


function PatchAPI(data, table) {
  return new Promise((resolve, reject) => {
    const id = data.id;
    delete (data.id);
    data.secretKey = window.localStorage.getItem('secretKey');
    request.patch(UrlAPI + table + '/' + id)
      .set('Content-Type', 'application/json')
      .send(data)
      .end(function(err, res) {
        if (err || !res.ok) {
          //console.log('Oh no! error' + JSON.stringify(err));
        } else {
          //console.log('yay posted ' + JSON.stringify(res.text));
          resolve(JSON.parse(res.text));
        }
      })
  });
}

export function patchProductAPI(data) {
  return PatchAPI(data, 'product');
}
;

export function patchShopAPI(data) {
  return PatchAPI(data, 'shop');
}
;

export function patchCategoryAPI(data) {
  return PatchAPI(data, 'category');
}
;

export function patchViewpointAPI(data) {
  return PatchAPI(data, 'viewpoint');
}
;

export function patchHotspotAPI(data) {
  return PatchAPI(data, 'hotspot');
}
;

export function connectProductToHotspotAPI(data) {
  return PatchAPI(data, 'hotspot');
}
;
