const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userId = '5b74f2ac6657e9187221ab74';

// var id = '5b78acfcec9a0e193b8a95e211';
//
// if (!ObjectId.isValid(id)) {
//   return console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo',todo);
// });

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('UserById',user);
}).catch((e) => console.log(e));
