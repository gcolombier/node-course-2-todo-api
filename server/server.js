var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mangoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send();
    console.log('id is invalid');
  }

  Todo.find({
    _id: id
  }).then((todo) => {
    if (!todo) {
      res.status(404).send();
      console.log(`object with id ${id}, not found`);
    }
    res.status(200).send({todo});
    console.log('Todo',todo);
  }).catch((e) => {
    res.status(400).send();
    console.log('error accessing to the db')
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};