const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findByIdAndRemove({})
// Todo.finOneAndRemove()

Todo.findOneAndRemove({id:'5b7ce0df5e9d43575e57121a'}).then((todo) => {
  
});

Todo.findByIdAndRemove('5b7ce0df5e9d43575e57121a').then((todo) => {
  console.log(todo);
});