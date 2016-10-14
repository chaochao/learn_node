//review some javascript and node stuff
console.log('start passward manager');

var storage = require('node-persist');

storage.initSync();


function creatAccount(account){
  var accounts = storage.getItemSync('accounts');

  if (typeof accounts === 'undefined') {
    accounts = [];
  }
  accounts.push(account);
  storage.setItemSync('accounts',accounts);
  //this is not good return value
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

creatAccount({
  name: 'test',
  username: 'some@hotmail.com',
  password: '123'
})

var account = getAccount('test');
console.log(account);