var user = require ('./user')
var role = require ('./role')

user.map(function (userObj) {
  userObj.role = (role.filter(function (roleObj) {
    return roleObj.id === userObj.role;
  }).shift() || {
    role: null
  }).role;
});

console.log(user)