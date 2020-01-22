var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var model = require('../models')
var jwt = require('jsonwebtoken')


chai.use(chaiHttp);
var requester = chai.request(app).keepOpen()

describe('User', function () {
    var token = ''
    var user_id = ''
    beforeEach(function (done) {
        model.User.destroy({
            where:{}
        })
        .then(function(){
            model.User.create({
                name : 'dummy',
                email : 'dummy@mail.com',
                balance: 100
            })
                .then(function (user) {
                    user_id = user.id

                    token =jwt.sign({
                        id: user.id,
                        email:user.email
                    },"asd");
                    done()
                })
        })
    })

    describe('GET/users', function(){
        it('GET /users will return all user data', function (done) {
            requester
                .get('/users/tanpaToken')
                .end(function(err, res){
                    // console.log('=======', res)
                    assert.equal(res.status, 200);
                    assert.typeOf(res.body, 'array');

                    assert.property(res.body[0], 'name');
                    assert.property(res.body[0], 'email');
                    assert.property(res.body[0], 'balance');

                    assert.equal(res.body[0].name,'dummy');
                    assert.equal(res.body[0].email,'dummy@mail.com');
                    assert.equal(res.body[0].balance,100);
                    done()
                })

        })

        it('will return error if token is empty', function (done) {
            requester
                .get('/users')
                .end(function (err, res) {
                    assert.equal(res.status, 400);
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body, 'err');

                    assert.equal(res.body.err, 'token must be exist')

                    done()

                })
            
        })
        it('will return all data if token is valid', function (done) {
            requester
                .get('/users')
                .set('authorization', token)
                .end(function (err, ress) {
                    assert.equal(res.status, 400);
                    assert.typeOf(res.body, 'array');
                    assert.property(res.body[0], 'name');
                    assert.property(res.body[0], 'email');
                    assert.property(res.body[0], 'balance');

                    assert.equal(res.body[0].name,'dummy');
                    assert.equal(res.body[0].email,'dummy@mail.com');
                    assert.equal(res.body[0].balance,100);

                    done()
                })

        })
    });
    describe("PUT/users", function () {
        it('will update data', function (done) {
            requester
                .put('/users/' + user_id)
                .send({
                    "name " : "dummytes",
                    "email" : "dami@mail.com",
                    "balance" : 2000
                })
                .end(function (err, res) {

                    assert.equal(res.status, 201);
                    assert.typeOf(res.body, 'object');

                    assert.property(res.body, 'status');
                    assert.property(res.body, 'data');

                    assert.equal(res.body.status,'updated');
                    assert.equal(res.body.data[0],1);
                    done()
                });

        })
    })

    describe("DELETE/users", function(){
        it('DELETE /users will delete data',  function (done) {
        requester
            .delete(/users/+user_id)
            .then(function (res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.name,'null');
                assert.equal(res.body.email,'null');
                done()
            })
        })
    })


})

//chai http request api
//chai js assertt
