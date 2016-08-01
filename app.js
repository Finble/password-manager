console.log('starting password manager');

var crypto = require('crypto-js'); // require to enable encryption = INSTALL IN TERMINAL!
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
	.command('create', 'Create a new account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Get an existing account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

// ENCRYPTION
// create getAccounts function to grab all accounts in an array using a masterPassword and decrypt, implement it within createAccount

function getAccounts (masterPassword) {
	// use getItemSync to fetch accounts saved locally
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];  // by default, accounts are an array
	// decrypt
	if (typeof encryptedAccount !== 'undefined') {  // if array is NOT undefined/empty, there is an account to decrypt, but if array IS undefined, then there is nothing to decrypt
		var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);  // decrypt account
		var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));  // set it to accounts
	}
	// return accounts array
	return accounts;
}

// create saveAccounts to encrypt accounts once created and added to array

function saveAccounts (accounts, masterPassword) {
	// encrypt accounts
	var encryptedAccount = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	// setItemSync
	storage.setItemSync('accounts', encryptedAccount.toString());
	// return accounts;
	return accounts;
}

// refactor createAccount to implement encryption from getAccounts

function createAccount (account, masterPassword) {  
	var accounts = getAccounts(masterPassword);

	accounts.push(account);
	saveAccounts(accounts, masterPassword);

	// var accounts = storage.getItemSync('accounts');

	// if (typeof accounts === 'undefined') {
	// 	accounts = [];
	// }

	// storage.setItemSync('accounts', accounts);

	return account;
}

// refactor getAccount to implement encryption from getAccounts

function getAccount (accountName, masterPassword) {  
	// var accounts = storage.getItemSync('accounts');
	var accounts = getAccounts(masterPassword);
	var matchedAccount;

	accounts.forEach(function (account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

if (command === 'create') {
	var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password
	}, argv.masterPassword);  
	console.log('Account created!');
	console.log(createdAccount);
} else if (command === 'get') {
	var fetchedAccount = getAccount(argv.name, argv.masterPassword);  

	if (typeof fetchedAccount === 'undefined') {
		console.log('Account not found');
	} else {
		console.log('Account found!');
		console.log(fetchedAccount);
	}
}