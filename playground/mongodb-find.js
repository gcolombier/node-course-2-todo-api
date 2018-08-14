// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err,client) => {
  if (err) {
    return console.log('Unable to connect to the Mongo DB server');
  }
  console.log('Successfully connected to Mongo DB');

  var db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id:new ObjectID('5b70fe49b3b6512b1537cbe6')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch documents',err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}` );
  // }, (err) => {
  //   console.log('Unable to fetch documents',err);
  // });

  db.collection('Users').find({name:'Guillaume'}).count().then((count) => {
    console.log(`Users count: ${count}` );
  }, (err) => {
    console.log('Unable to fetch documents',err);
  });

  db.collection('Users').find(
    {name:'Guillaume'}
  ).toArray().then((docs) => {
    console.log('Users:');
    console.log(JSON.stringify(docs,undefined,2));
  }, (err) => {
    console.log('Unable to fetch documents',err);
  });

  // client.close();
});
