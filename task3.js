const fs = require('fs');

console.log('start')

function readData(filePath, callback) {
  fs.readFile(filePath, 'UTF-8', function (err, data) {
    if(err){
      callback(err,null)
    } else {
      callback(null, data)
    }
  })
  var content = JSON.parse(readData)
}
readData('./user.json',function (err, user) {
  console.log("id")
  console.log(user)
  })
