var arr=[5,3,1,2,4]

function oddValue(num, callback){
  var result = []
  for(let i=0; i<num.length; i++){
    if(num[i]%2 !== 0){
      result.push(num[i])
    }
  }
  callback(result)
}

oddValue(arr, function(data){
  console.log(data)
})