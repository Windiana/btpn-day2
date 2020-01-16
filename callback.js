const fs = require('fs');

console.log("start")

function readData(filePath, callback){
    fs.readFile(filePath, 'UTF8', function(err, data){
        if (err){
            callback(err, null)
        }else{
            callback(null, data)
        }
    })
}

readData("./user.json", function(err, hasilData){
    console.log(hasilData)
})

console.log("end")