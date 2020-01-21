var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models =require('../models');
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen()

var token = ''
var userId = ''

describe('User', function () {
  //hooks untuk dummy
  beforeEach(function (done) {
    models.User.destroy({
      where: {}
    }).then(function () {
      models.User.create({
        firstName: 'dummy',
        lastName: 'data',
        email: 'dummy@mail.com'
      })
        //generate token
        .then(function (user) {
          userId = user.id
          token = jwt.sign({
            id: user.id,
            email: user.email
          }, process.env.SECRET);

          done()
        })
    })
  })

  describe('GET /users', function() {
    it('will return all user data', function (done) {
      requester
        .get('/users/tanpaToken')
        .end(function (err, res) {
          //check res status
          assert.equal(res.status, 200)
          //check tipe data
          assert.typeOf(res.body, 'array')
          //expect properties
          assert.property(res.body[0], 'email')
          assert.property(res.body[0], 'firstName')
          assert.property(res.body[0], 'lastName')
          //expect isi
          assert.equal(res.body[0].firstName, 'dummy')
          assert.equal(res.body[0].lastName, 'data')
          assert.equal(res.body[0].email, 'dummy@mail.com')

          done()
        })
    })
  })



  describe('GET /users', function() {
    it('will return error if token is empty', function (done) {
      requester
        .get('/users')
        .end(function (err, res) {
          //console.log("=========================",res.body)
          //check res status
          assert.equal(res.status, 400)
          //check tipe data
          assert.typeOf(res.body, 'object')
          //expect properties
          assert.property(res.body, 'status')
          //expect isi
          assert.equal(res.body.status, 'Invalid Token')
          done()
        })
    })
  })

  describe('GET /users', function() {
    it('will return all user data if token is valid', function (done) {
      requester
        .get('/users')
        .set("authorization", token)
        .end(function (err, res) {
          //check res status
          assert.equal(res.status, 200)
          //check tipe data
          assert.typeOf(res.body, 'array')
          //expect properties
          assert.property(res.body[0], 'email')
          assert.property(res.body[0], 'firstName')
          assert.property(res.body[0], 'lastName')
          //expect isi
          assert.equal(res.body[0].firstName, 'dummy')
          assert.equal(res.body[0].lastName, 'data')
          assert.equal(res.body[0].email, 'dummy@mail.com')
          done()
        })
    })
  })

    it('POST /users will return new added user', function (done) {
      requester
        .post('/users')
        .send({
          firstName: 'new',
          lastName: 'user',
          email: 'newuser@mail.com'
        })
        .then(function (res) {
          //console.log('====================', res.body)
          //check res status
          assert.equal(res.status, 200)
          //check tipe data
          assert.typeOf(res.body, 'object')
          //expect properties
          assert.property(res.body.data, 'email')
          assert.property(res.body.data, 'firstName')
          assert.property(res.body.data, 'lastName')
          //expect isi
          assert.equal(res.body.data.firstName, 'new')
          assert.equal(res.body.data.lastName, 'user')
          assert.equal(res.body.data.email, 'newuser@mail.com')

          done()
        })
    })

  it('PUT /users/:id will return updated user data', function (done) {
        requester
          .put(`/users/${userId}`)
          .send({
            firstName: 'new',
            lastName: 'user1',
            email: 'newuser1@mail.com'
          })
          .then(function (res) {
            //check res status
            assert.equal(res.status, 200)
            //check tipe data
            assert.typeOf(res.body, 'object')
            //expect properties
            assert.property(res.body, 'status')
            //expect isi
            assert.equal(res.body.status, 'ok')

            done()
          })
      })
  })

  it('DELETE /users/:id will return status ok', function (done) {
    requester
      .delete(`/users/${userId}`)
      .then(function (err, res) {
        assert.equal(res.status, 200)
        //check tipe data
        assert.equal(res.body, 'data')
        assert.equal(res.body.data, 'firstName')
        //expect properties
        //expect isi
        assert.equal(res.body.data.firstName, null)
        done()
      })

  })
