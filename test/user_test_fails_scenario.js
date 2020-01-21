var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models = require('../models');
var jwt = require('jsonwebtoken');


chai.use(chaiHttp);
var requester = chai.request(app).keepOpen();

describe('User', function () {

  beforeEach(function(done) {
    models.User.destroy({
      where: {}
    })
        .then(function() {
          models.User.create({
            name: 'dummy3',
            email: 'dummy3@mail.com',
            balance: 2532
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
//end before each

});
//end last describe