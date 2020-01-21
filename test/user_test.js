var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models = require('../models');
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen();

describe('User', function() {
    var token = '';
    var userId = '';
    beforeEach(function(done) {
        models.User.destroy({
            where: {}
        })
            .then(function() {
                models.User.create({
                    name: 'dummy',
                    email: 'dummy2@mail.com',
                    balance: 1000000
                })
                    .then(function(user) {
                        //generate token
                        userId = user.id;
                        token = jwt.sign({
                            id : user.id,
                            email : user.email
                        }, "asd");
                        done()
                    })
            })
    });

    describe('GET /users', function() {
        it('GET /users/tanpaToken should return all user data', function(done) {
            requester
                .get('/users/tanpaToken')
                .end(function(err, res) {
                    //cek res status
                    //cek tipe data
                    //cek properties
                    //cek value
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');
                    assert.property(res.body[0], 'name');
                    assert.property(res.body[0], 'email');
                    assert.property(res.body[0], 'balance');

                    assert.equal(res.body[0].name, "dummy");
                    assert.equal(res.body[0].email, "dummy2@mail.com");
                    assert.equal(res.body[0].balance, 1000000);

                    done();
                });
        });

        it('will return error if token is empty', function(done) {
            requester
                .get('/users')
                .end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body, 'err');

                    assert.equal(res.body.err, "TOKEN INVALID")
                    done()
                })
        });

        it('will return all user data if token is valid', function(done) {
            requester
                .get('/users')
                .set('authorization', token)
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');
                    assert.property(res.body[0], 'name');
                    assert.property(res.body[0], 'email');
                    assert.property(res.body[0], 'balance');

                    assert.equal(res.body[0].name, "dummy");
                    assert.equal(res.body[0].email, "dummy2@mail.com");
                    assert.equal(res.body[0].balance, 1000000);

                    done()
                })
        })

    });

    it('POST /users should return new added user', function(done) {
        requester
            .post('/users')
            .send({
              name: "Cecep Supriadi",
              email : "cecep@mail.com",
              balance : 1250
            })
            .then(function (res ){
              assert.equal(res.status , 201);
              assert.typeOf(res.body , 'object');
              assert.property(res.body.data, 'email');
              assert.property(res.body.data,'balance');
              //
              // assert.equal(res.body.name , "Cecep Supriadi");
              assert.equal(res.body.data.email,"cecep@mail.com");
              assert.equal(res.body.data.balance, 1250);

              done()
            })
    });

    it('PUT /users should return updated user data', function(done) {
        requester
            .put("/users/" + userId)
            .send({
              name : "Supriadi53",
              email : "supriadi53@gmail.com",
              balance : 2550
            })
            .then(function (res) {
              console.log('-----------------', res.body);
              assert.equal(res.status , 201);
              assert.typeOf(res.body , 'object');
              assert.property(res.body.data, 'name');
              assert.property(res.body.data, 'email');
              assert.property(res.body.data,'balance');

              assert.equal(res.body.data.name , "Supriadi53");
              assert.equal(res.body.data.email,"supriadi53@gmail.com");
              done()
            })
    });

    it('DELETE /users should return deleted user data', function(done) {
        requester
            .delete(/users/ + userId)
            .then(function (res) {
              assert.equal(res.status , 200);
              assert.equal(res.body.data.name , null);
              assert.equal(res.body.data.email,null);
              console.log("SUCCESS DELETED DATA");
              done()
            })
    })
});