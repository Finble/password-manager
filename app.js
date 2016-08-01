console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

var accounts = storage.getItemSync('accounts');

// push on a new account to array - add code, run code, then comment out

// accounts.push({ 
//     username: 'Jen',
//     balance: 75
// });

// save using setItemSync - add code, run code, then comment out - to check object printed out locally (to test all working)

// storage.setItemSync('accounts', accounts);

console.log(accounts);



