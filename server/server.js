var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mangoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
    // console.log('id is invalid');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
      // console.log(`object with id ${id}, not found`);
    }
    res.status(200).send({todo});
    // console.log('Todo',todo);
  }).catch((e) => {
    return res.status(400).send();
    // console.log('error accessing to the db')
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
