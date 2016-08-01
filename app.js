console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();


// create account with name, username + balance

function createAccount (account) {
    var accounts = storage.getItemSync('accounts');

    // ensure we have an empty array to start, if no accounts created before, then value of accounts array will be undefined
    if (typeof accounts === 'undefined') {
        accounts = [];
    }
    // push on new account to array
    accounts.push(account);
    storage.setItemSync('accounts', accounts);  // to accommodate if accounts already exist

    // return account
    return account;
}

function getAccount (accountName) {
    // var accounts, use getItemSync
    var accounts = storage.getItemSync('accounts');  // saved locally on pc via persist
    var matchedAccounts;

    accounts.forEach(function (account) {
        if (account.name === accountName) {
        matchedAccount = account;
        }
    });
    return matchedAccount;
}

// DELETE PERSIST FILES FIRST! run createAccount, then comment out

// createAccount({
//     name: 'Elaine',
//     username: 'someemail@gmail.com',
//     password: 'Password123!'
// });

// run below and terminal should show above object!

var elaineAccount = getAccount('Elaine');
console.log(elaineAccount);


