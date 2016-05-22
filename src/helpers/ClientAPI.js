import request from 'superagent';

import { apiURL } from '~/src/config';
const UrlAPI = apiURL;

////////////////////////////////////// POST API /////////////////////////////////


function PostAPI(data, table) {
    return new Promise((resolve, reject) => {
        request.post(UrlAPI + table + '/')
            .set('Content-Type', 'application/json')
            .send(data)
            .end(function(err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! error' + JSON.stringify(err));
                } else {
                    //console.log('yay posted ' + JSON.stringify(res.text));
                    resolve(JSON.parse(res.text)["Item"]);
                }
            })
    });
};

export function addProductAPI(data) {
    return PostAPI(data, 'product');
};

export function addShopAPI(data) {
    return PostAPI(data, 'shop');

};

export function addViewpointAPI(data) {
    return PostAPI(data, 'viewpoint');
};

export function addHotspotAPI(data) {
    return PostAPI(data, 'hotspot');
};

////////////////////////////////////// DELETE API /////////////////////////////////


function DeleteAPI(object, table) {
    return new Promise((resolve, reject) => {
        var getResult = (() => {
            request.del(UrlAPI + table + '/' + object.name)
                .set('Content-Type', 'application/json')
                .end(function(err, res) {
                    if (err || !res.ok) {
                        console.log('Oh no! error' + JSON.stringify(err));
                    } else {
                        //console.log('yay got ' + JSON.stringify(res.body));
                        resolve({ index: object.index });
                    }
                })
        })();
    });
};

export function deleteHotspotAPI(object) {
    return DeleteAPI(object, 'hotspot');
};

export function deleteProductAPI(object) {
    return DeleteAPI(object, 'product');
};

export function deleteShopAPI(object) {
    return DeleteAPI(object, 'shop');
};


////////////////////////////////////// GET API /////////////////////////////////

function GetPerShopAPI(name, table) {
    return new Promise((resolve, reject) => {
        var getResult = (() => {
            request.get(UrlAPI + table + '/')
                .query({ 'filter[shop]': String(name) })
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

function GetPerViewpointAPI(shopName, viewpointName, table) {
    return new Promise((resolve, reject) => {
        var getResult = (() => {
            request.get(UrlAPI + table + '/')
                .query({ 'filter[shop]': String(shopName) })
                .query({ 'filter[viewpoint]': String(viewpointName) })
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

export function fetchHotspotsAPI(shop, viewpoint) {
    return GetPerViewpointAPI(shop, viewpoint, 'hotspot');
};

export function fetchProductsAPI(name) {
    return GetPerShopAPI(name, 'product');
};

export function fetchViewpointsAPI(name) {
    return GetPerShopAPI(name, 'viewpoint');
};


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
};


////////////////////////////////////// PATCH API /////////////////////////////////


function PatchAPI(data, table) {
    return new Promise((resolve, reject) => {
        const name = data.name;
        delete(data.name);
        request.patch(UrlAPI + table + '/' + name)
            .set('Content-Type', 'application/json')
            .send(data)
            .end(function(err, res) {
                if (err || !res.ok) {
                    //console.log('Oh no! error' + JSON.stringify(err));
                } else {
                    //console.log('yay posted ' + JSON.stringify(res.text));
                    resolve(JSON.parse(res.text)["Item"]);
                }
            })
    });
}

export function patchProductAPI(data) {
    return PatchAPI(data, 'product');
};

export function connectProductToHotspotAPI(data) {
    return PatchAPI(data, 'hotspot');
};
