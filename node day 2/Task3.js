const fs = require('fs')

function readData(filePath, callback){
  fs.readFile(filePath, 'UTF8', function (err, data) {
    if(err){
      callback(data, null)
    }callback(null, data)
  })
}

readData('./user.json', function (err, hasilData) {
  var userArr = JSON.parse(hasilData)
  readData('./role.json', function (err, hasilRole) {
    var roleArr = JSON.parse(hasilRole)

    userArr.map(function (userObj) {
      userObj.role = (roleArr.filter(function (roleObj) {
        return roleObj.id === userObj.role;
      }).shift() || {
        role: null
      }).role;
    });
    console.log(userArr)
  })
})
