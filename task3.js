const fs = require('fs');

function readData(filePath, callback){
    fs.readFile(filePath,"UTF8",function(err, data){
        if(err){
            callback(err, null)
        }
        callback(null, data)
    })
}

readData("./user.json",function(err, hasilUser){
    var jsonObj = JSON.parse(hasilUser)
    console.log(jsonObj.id)
})