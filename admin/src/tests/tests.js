const testAddUser = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_USER',
    userid: 0,
    username: 'micahzev',
    email: 'friedland.micah@gmail.com',
    password: 'password'
  };
  const stateAfter = [
      {
      userid: 0,
      username: 'micahzev',
      email: 'friedland.micah@gmail.com',
      password: 'password',
      shops:[],
      loggedIn:false,
      isCurrentUser:false
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    users(stateBefore, action)
  ).toEqual(stateAfter);
};

const testAddShop = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_SHOP',
    shopid: 0,
    name: 'Micah Shop',    
  };
  const stateAfter = [
      {
          shopid:0,
          name:'Micah Shop',
          views:[]
        }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    shops(stateBefore, action)
  ).toEqual(stateAfter);
};

const testAddShoptoUser = () => {
  const stateBefore = [
    {
      userid: 0,
      username: 'micahzev',
      email: 'friedland.micah@gmail.com',
      password: 'password',
      shops:[]
    },
    {
      userid: 1,
      username: 'musnit',
      email: 'musnit@gmail.com',
      password: 'password',
      shops:[]
    }
  ];
  const action = {
    type: 'ADD_SHOP_TO_USER',
    userid: 1, 
    shopid: 0
  };
  const stateAfter = [
    {
      userid: 0,
      username: 'micahzev',
      email: 'friedland.micah@gmail.com',
      password: 'password',
      shops:[]
    },
    {
      userid: 1,
      username: 'musnit',
      email: 'musnit@gmail.com',
      password: 'password',
      shops:[0]
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    users(stateBefore, action)
  ).toEqual(stateAfter);
};

const testAddView = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_VIEW',
    viewid: 0,
    imageURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Wikimedia_Foundation_RGB_logo_with_text.svg/400px-Wikimedia_Foundation_RGB_logo_with_text.svg.png' 
  };
  const stateAfter = [
      {
          viewid:0,
          imageURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Wikimedia_Foundation_RGB_logo_with_text.svg/400px-Wikimedia_Foundation_RGB_logo_with_text.svg.png' 
        }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    views(stateBefore, action)
  ).toEqual(stateAfter);
};

const testAddViewtoShop = () => {
  const stateBefore = [
    {
          shopid:0,
          name:'Micah Shop',
          views:[7]
    },
    {
          shopid:1,
          name:'Musnit Shop',
          views:[]
    }
  ];
  const action = {
    type: 'ADD_VIEW_TO_SHOP',
    shopid: 1, 
    viewid: 0
  };
  const stateAfter = [
    {
          shopid:0,
          name:'Micah Shop',
          views:[7]
    },
    {
          shopid:1,
          name:'Musnit Shop',
          views:[0]
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    shops(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddUser();

console.log('testAddUser passed.');  
  
testAddShop();

console.log('testAddShop passed.');  
  
testAddShoptoUser();

console.log('testAddShoptoUser passed.');  
  
testAddView();
  
console.log('testAddView passed.');
  
testAddViewtoShop();

console.log('testAddViewtoShop passed.');

console.log('All tests passed.');
