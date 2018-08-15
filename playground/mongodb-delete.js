// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err,client) => {
    if (err) {
    return console.log('Unable to connect to the Mongo DB server');
  }
  console.log('Successfully connected to Mongo DB');

  var db = client.db('TodoApp');

  // db.collection('Todos').deleteMany({text:'eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text:'eat lunch'}).then( (res) => {
  //   console.log(res);
  // });

  // db.collection('Todos').findOneAndDelete({completed:false}).then( (res) => {
  //   console.log(res);
  // });

  db.collection('Users').deleteMany({name:'Guillaume'}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5b70fffe614c8e2b1a77fafe')
  }).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  });



  // client.close();
});
