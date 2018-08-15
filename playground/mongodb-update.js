// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err,client) => {
    if (err) {
    return console.log('Unable to connect to the Mongo DB server');
  }
  console.log('Successfully connected to Mongo DB');

  var db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID('5b70fe231e8ed02b125038bd')
  // },{
  //   $set:{
  //     completed:true
  //   }
  // },{
  //   returnOriginal:false
  // }).then( (result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID('5b7101bbb0ab022b228930e7')
  },{
    $inc:{
      age:2
    },
    $set:{
      name:"Guillaume"
    }
  },{
    returnOriginal:false
  }).then( (result) => {
    console.log(result);
  });

  // client.close();
});
