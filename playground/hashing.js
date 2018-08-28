const bcrypt = require('bcryptjs');

// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');

// var data = {
//   id:10
// }

// var token = jwt.sign(data,'123abc');
// console.log(token);

// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
// jwt.verify

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message is ${message}`);
// console.log(`Hash is ${hash}`);

// var data = {
//   id:4
// };

// var token = {
//   data,
//   hash:   SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed, do not trust');
// }


var password = '123abc!';

// bcrypt.genSalt(10,(err,saltValue) => {
//   bcrypt.hash(password,saltValue, (err,hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$eRBpdig.6ypSoNBaEQIwT.HVV.973897u5Mkct08oGN2kmohuzT3q';

bcrypt.compare(password,hashedPassword,(err,result) => {
  console.log(result);
});


