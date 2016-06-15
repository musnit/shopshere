export function testActions(store) {

  //remove later just for testing for now
  console.log('Initial state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_USER.');
  store.dispatch({
    type: 'ADD_USER',
    userid: 0,
    username: 'user_name',
    email: 'friedland.micah@gmail.com',
    password: 'password'
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_SHOP.');
  store.dispatch({
    type: 'ADD_SHOP',
    shopid: 0,
    name: 'One stop shop 360 degree',
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_SHOP.');
  store.dispatch({
    type: 'ADD_SHOP',
    shopid: 2,
    name: '360 shopping',
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_SHOP.');
  store.dispatch({
    type: 'ADD_SHOP',
    shopid: 1,
    name: 'Musnit Shop',
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_SHOP_TO_USER.');
  store.dispatch({
    type: 'ADD_SHOP_TO_USER',
    userid: 0,
    shopid: 0
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_SHOP_TO_USER.');
  store.dispatch({
    type: 'ADD_SHOP_TO_USER',
    userid: 0,
    shopid: 2
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_VIEW.');
  store.dispatch({
    type: 'ADD_VIEW',
    viewid: 0,
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Wikimedia_Foundation_RGB_logo_with_text.svg/400px-Wikimedia_Foundation_RGB_logo_with_text.svg.png'
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching TOGGLE_LOGGED_IN.');
  store.dispatch({
    type: 'TOGGLE_LOGGED_IN',
    userid: 0
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching TOGGLE_CURRENT_USER.');
  store.dispatch({
    type: 'TOGGLE_CURRENT_USER',
    userid: 0
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');
}
;