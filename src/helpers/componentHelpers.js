export function getCurrentUserId(users) {
     let outputId = undefined;
    
  
    for (let i = 0; i < users.length; i++){
        if (users[i].isCurrentUser)
          {
            outputId = users[i].userid;
          }
    
    return outputId;
  };
};

export function getCurrentShopIds(users) {
  
  let output = [];
  
  let currentUId = getCurrentUserId(users);
  
  for (let i = 0; i < users.length; i++){
    if (users[i].userid === currentUId)
      {
        output = users[i].shops;
      }
  };
  
  return output;
};

export function getMyShops(users, shops) {
  
  let output = [];
  
  let shopIds = getCurrentShopIds(users);



  
  for (let  i = 0; i < shops.length; i++) {
    if (shopIds.includes(shops[i].shopid))
      {
        output.push(shops[i])
      }
    };
  return output;
};

export function getUser(users) {
    
    let outputUser = undefined;
    
  
    for (let i = 0; i < users.length; i++){
    

    if (users[i].isCurrentUser)
      {
        outputUser = users[i];
      }
    
    return outputUser;
  };
};


