console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

// test persist works, i.e. that you can save a var/array and get it back (save, then comment out save)

// VARIABLE
// storage.setItemSync('name', 'Andrew'); // run this then comment out, to test if var saved
// var name = storage.getItemSync('name');
// console.log('saved name is: ' + name);

// ARRAY
// storage.setItemSync('accounts', [{ // test array can be saved too
//  username: 'Andrew',
//  balance: 0
// }]);

var accounts = storage.getItemSync('accounts');
console.log(accounts);