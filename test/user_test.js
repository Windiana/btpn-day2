var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models = require('../models')
var jwt = require("jsonwebtoken")

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen()

describe('User', function () {

  var token= ''
  var userId = ''
  beforeEach(function (done) {
    models.User.destroy({
      where:{}
    })
      .then(function () {
        models.User.create({
          name : 'dummy',
          email : 'dummy@mail.com'
        })
          .then(function (user) {
            //generate Token
            userId = user.id
            token = jwt.sign({
              id:user.id,
              email: user.email
            },process.env.SECRET_TOKEN)
            done()
          })
      })

  })

  describe('GET/users', function () {
    it('will return all user data', function (done) {
      requester
        .get('/users/tanpaToken')
        .end(function (err, res) {
          console.log("-----------------", res.body)

          // expected res.statusnya
          // expected tipe data nya
          // expected properties nya ada apa aja
          // expected isi datanya

          assert.equal(res.status, 200);
          assert.typeOf(res.body, 'array');
          assert.property(res.body[0], 'email');
          assert.property(res.body[0], 'name');

          assert.equal(res.body[0].name, 'dummy');
          assert.equal(res.body[0].email, 'dummy@mail.com')
          done()
        })
    })
  })

  it('will return error if token is empty', function (done) {
    requester
      .get('/users')
      .end(function (err, res) {

        assert.equal(res.status, 400);
        assert.typeOf(res.body, 'object');
        assert.property(res.body, 'message');

        assert.equal(res.body.message, 'Invalid Token');
        done()
      })
  })

  it('will return all user data', function (done) {
    requester
      .get('/users')
      .set("authorization", token)
      .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.typeOf(res.body, 'array');
      assert.property(res.body[0], 'email');
      assert.property(res.body[0], 'name');

      assert.equal(res.body[0].name, 'dummy');
      assert.equal(res.body[0].email, 'dummy@mail.com')
      done()
    })
  })

  it("POST /users will return new added user", function (done) {
    requester
      .post("/users")
      .send({
        name:"new",
        email: "newUser@mail.com"
      })
      .then(function (res) {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, "object");
        assert.property(res.body.data, "name");
        assert.property(res.body.data, "email");

        assert.equal(res.body.data.name, "new")
        assert.equal(res.body.data.email, "newUser@mail.com")

        done()
      })
  })

  it('PUT/users/:id will return updated user data', function (done) {
    requester
      .put(`/users/${userId}`)
      .send({
        name:"Bambang",
        email:"Bambangs@mail.com"
      })
      .then(function (res) {
        console.log("==================================="+ JSON.stringify(res.body)+ "======")
        assert.equal(res.status, 200)
        assert.typeOf(res.body, "object")
        assert.property(res.body, "status")
        assert.property(res.body, "data")
        assert.equal(res.body.status, "OK!")
        done()

      })
    })
  })
  it('DELETE/users/:id will return status ok',function (done) {
    requester
      .delete(`/users/{userId}`)
      .then(function (res) {
        assert.equal(res.status, 200)
        assert.property(res.body,"status")
        assert.property(res.body, "data")
        assert.equal(res.body.status,"Delete Success !")
        assert.equal(res.body.data, "null")
        done()
      })
  })

