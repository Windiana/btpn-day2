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

async function getData(){
    var data= await readData("./user.json")
    console.log(data)
}

getData()