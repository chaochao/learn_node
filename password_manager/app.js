//review some javascript and node stuff
// use 3rd party lib to get data from terminal and store.
console.log('start passward manager');

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
        passward: {
          demand: true,
          alias: 'p',
          description: "passward",
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
// console.log(argv);


switch (command) {
  case 'create':
    console.log("do create");
    creatAccount({
      name: argv.name,
      username: argv.username,
      passward: argv.passward});
    break;
  case 'get':
    console.log("do get");
    var account = getAccount(argv.name);
    if (typeof account === 'undefined') {
      console.log("no such account");
      break;
    }
    console.log(account);
    break;
    // TODO: edit
}

// util functions
function creatAccount(account){
  var accounts = storage.getItemSync('accounts');

  if (typeof accounts === 'undefined') {
    accounts = [];
  }
  accounts.push(account);
  storage.setItemSync('accounts',accounts);
  return account
}

function getAccount(accountName){
  var accounts = storage.getItemSync('accounts');
  var matchedAccount;

  accounts.forEach( function(account) {
    if (account.name == accountName) {
      matchedAccount = account;
    }
  });
  return matchedAccount;
}







