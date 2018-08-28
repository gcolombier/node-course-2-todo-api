const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos,populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text'

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
        expect(res.body.text).toBe(text)
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done();
      }).catch ( (err) => done(err))
    })
  })

  it('should not create a new todo with invalid body data', (done) => {


    request(app)
    .post('/todos')
    .send()
    .expect(400)
    .end((err,res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then( (todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch ( (err) => done(err));
    });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    // console.log(`/todos/${todos[0]._id.toHexString()}`);

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
        // console.log('Hello:',res.body.Todo.text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get('/todos/5b78acfcec9a0e193b8a95e2')
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object id', (done) => {
    request(app)
      .get('/todos/5b78acfcec9a0e193b8a95e218')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    // console.log(`/todos/${todos[0]._id.toHexString()}`);
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        // console.log('Hello:',res.body.Todo.text);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist;
          done();
        }).catch ( (err) => done(err));
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete('/todos/5b78acfcec9a0e193b8a95e2')
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object id', (done) => {
    request(app)
      .delete('/todos/5b78acfcec9a0e193b8a95e218')
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    // console.log(`/todos/${todos[0]._id.toHexString()}`);
    var hexId0 = todos[0]._id.toHexString();

    var updatedTodos = [{
      text: "updated first todo",
      completed:true
    },{
      text: "updated second todo",
      completed:false
    }];

    request(app)
      .patch(`/todos/${hexId0}`)
      .send(updatedTodos[0])
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(updatedTodos[0].text);
        expect(typeof res.body.todo.completedAt).toBe('number');
        expect(res.body.todo.completed).toBe(true);
        // console.log('Hello:',res.body.Todo.text);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexId0).then((todo) => {
          expect(todo.text).toBe(updatedTodos[0].text);
          expect(typeof todo.completedAt).toBe('number');
          done();
        }).catch ( (err) => done(err));
      });
  });

  it('should clear completedAt when todo is not completed', (done)=> {
    var hexId1 = todos[1]._id.toHexString();

    var updatedTodos = [{
      text: "updated first todo",
      completed:true
    },{
      text: "updated second todo",
      completed:false
    }];

    request(app)
      .patch(`/todos/${hexId1}`)
      .send(updatedTodos[1])
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(updatedTodos[1].text);
        expect(typeof res.body.todo.completedAt).toNotExist;
        expect(res.body.todo.completed).toBe(false);
        // console.log('Hello:',res.body.Todo.text);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexId1).then((todo) => {
          expect(res.body.todo.text).toBe(updatedTodos[1].text);
          expect(typeof res.body.todo.completedAt).toNotExist;
          expect(res.body.todo.completed).toBe(false);
          done();
        }).catch ( (err) => done(err));
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .patch('/todos/5b78acfcec9a0e193b8a95e2')
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object id', (done) => {
    request(app)
      .patch('/todos/5b78acfcec9a0e193b8a95e218')
      .expect(404)
      .end(done);
  });

});

describe('GET /users/me',() => {
  it('should return user if authenticated', (done)=> {
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect( (res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect( (res) => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('POST /users',() => {
  it('should create a user', (done)=> {
    var email = 'example@example.com';
    var password = '123mnb!';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(200)
    .expect( (res) => {
       expect(res.headers['x-auth']).toExist;
       expect(res.body._id).toExist;
       expect(res.body.email).toBe(email); 
    })
    .end( (err) => {
      if (err) {
        return done(err);
      } else {
        User.findOne({email}).then((user)=> {
          expect(user).toExist;
          expect(user.password).not.toBe(password);
          done();
        });
      }
    });

  });

  it('should return validation errors if request invalid', (done) => {
    var email = 'example789';
    var password = 'uiiuu';

    request(app)
    .post('/users')
    .send({email,password})
    .expect(400)
    .end(done);

  });

  it('should not create user if email in use', (done) => {
    var password = 'uiiuu';

    request(app)
    .post('/users')
    .send({
      email :users[0].email,
      password : password})
    .expect(400)
    .end(done); 
  });


});
