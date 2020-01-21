var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models = require('../models')
var jwt = require('jsonwebtoken')

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen()

describe('User',function () {

  var token = ''
  var userId = ''

  beforeEach(function (done) {
    models.Users.destroy({
      where:{}
    }).then(function () {
      models.Users.create({
        email: 'dummy@gmail.com',
        name: 'dummy',
      })
        .then(function (user) {
          userId = user.id
          token = jwt.sign({
            id: user.id, email: user.email
          },process.env.TOKEN)
          done()
        })
    })
  })

  describe('GET /users',function () {
    it('will return all user data',function (done) {
      requester
        .get('/users/tanpaToken')
        .end(function (err,res) {

          //expext res.statusnya
          //expect type nya
          //expect properties nya ada apa aja
          //expect isi datanya

          assert.equal(res.status,200)
          assert.typeOf(res.body.users,'array')
          assert.property(res.body.users[0],'email')
          assert.property(res.body.users[0],'name')

          assert.equal(res.body.users[0].email,'dummy@gmail.com')
          assert.equal(res.body.users[0].name,'dummy')

          done()
        })
    })

    it('will return error if token empty',function (done) {
      requester
        .get('/users')
        .end(function (err,res) {
          assert.equal(res.status,400)
          assert.typeOf(res.body, 'object')
          assert.property(res.body, 'message')

          assert.equal(res.body.message,'token invalid')

          done()
        })
    })

    it('will return data if token valid', function (done) {
      requester
        .get('/users')
        .set("authorization",token)
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.typeOf(res.body, 'object')
          assert.property(res.body.users[0],'email')
          assert.property(res.body.users[0],'name')

          assert.equal(res.body.users[0].email,'dummy@gmail.com')
          assert.equal(res.body.users[0].name,'dummy')

          done()
        })
    })

    it('POST/Users will return added data',function (done) {
      requester
        .post('/users')
        .send({
          email:"dummy@gmail33.com",
          name:"dummy"
        })
      .then(function (res) {
        //console.log('=========================', res.body)
        assert.equal(res.status, 200)
        assert.typeOf(res.body, 'object')
        assert.property(res.body.data,'email')
        assert.property(res.body.data,'name')

        assert.equal(res.body.data.email,'dummy@gmail33.com')
        assert.equal(res.body.data.name,'dummy')

        done()
        })
    })

    it('PUT/Users/:id will return updated user data', function (done) {
      requester
        .put(`/users/${userId}`)
        .send({
          email:"aboe@gmail.com",
          name:"abu"
        })
        .then(function (err,res) {
          assert.equal(res.status,200)
          assert.typeOf(res.body, 'object')
          assert.property(res.body.data,'email')
          assert.property(res.body.data,'name')

          done()
        })
    })

    it('DELETE/Users/:id will return status ok', function (done) {
      requester
        .delete(`/users/${userId}`)
        .then(function (err,res) {
          assert.equal(res.status, 200)
          assert.equal(res.body, 'object')
          assert.equal(res.body.data, 'email')
          assert.equal(res.body.data.email, null)

          done()
        })
    })

  })
})
