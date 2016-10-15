//review some javascript and node stuff
// use 3rd party lib to get data from terminal and store.
console.log('start password manager');

//for encrytion. For better design you may want to input from the terminal
const MASTERCODE = 'abc'

var crypto = require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
    .command('create',"create account", function (yargs) {
      yargs.options({
        name: {
          demand: true,
          alias: 'n',
          description: "name",
          type: 'string'
        },
        username: {
          demand: true,
          alias: 'u',
          description: "username",
          type: 'string'
        },
        password: {
          demand: true,
          alias: 'p',
          description: "password",
          type: 'string'
        }
      }).help('help');
    })
    .command('get','get account', function (yargs) {
      yargs.options({
        name: {
          demand: true,
          alias: 'n',
          description: 'name',
          type: 'string'
        }
      }).help('help')
    })
    .help('help')
    .argv;
var command = argv._[0]

switch (command) {
  case 'create':
    try{
      saveAccount({
      name: argv.name,
      username: argv.username,
      password: argv.password});
    } catch (e){
      console.log(e.message);
    }
    break;
  case 'get':
    try{
      var account = getDecryptAccount(argv.name);
      if (typeof account === 'undefined') {
        console.log("no such account");
        break;
      }
      console.log(account);
    } catch (e){
      console.log(e.message);
    }
    break;
    // TODO: edit
}

// util functions

function getDecryptAccount (accountName) {
  var account = getAccount(accountName);
  if (typeof account !== 'undefined') {
    // Decrypt
    var bytes  = crypto.AES.decrypt(account.password.toString(), MASTERCODE);
    var decryptPassword = bytes.toString(crypto.enc.Utf8);
    account.password = decryptPassword;
    //it should be decrpted account
    return account;
  }
}

// May have multiple account with same name, no validation for this
function saveAccount (account) {
  console.log("encryptPassword");
  // encrypt return an object, not sure why it's diff from the doc
  //maybe use the old version?
  var encryptPassword = crypto.AES.encrypt(account.password, MASTERCODE).toString();
  var encryptAccount = {
    name: account.name,
    username: account.username,
    password: encryptPassword
  };
  creatAccount(encryptAccount);
}

function creatAccount (account) {
  var accounts = storage.getItemSync('accounts');

  if (typeof accounts === 'undefined'){
    accounts = [];
  }
  accounts.push(account);
  storage.setItemSync('accounts',accounts);
  return account
}

function getAccount (accountName) {
  var accounts = storage.getItemSync('accounts');
  var matchedAccount;

  accounts.forEach( function (account) {
    if (account.name == accountName) {
      matchedAccount = account;
    }
  });
  return matchedAccount;
}







