const fs = require('fs');

var readData = (filePath) =>{
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, 'UTF8', function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

readData("./user.json")
.then(function(hasilData){
    console.log(hasilData)

    return readData("./role.json")
})
.then(function(hasilRole){
    console.log(hasilRole)
})
.catch(function(hasilErr){
    console.log(hasilErr)
})