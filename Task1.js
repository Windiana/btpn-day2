function oddNumber(num,callback) {
  let newArray = []
  for (let i=0; i < num.length; i++){
    if (num[i] % 2 === 1){
      newArray.push(num[i])
    }
  }
    callback(newArray)
}

oddNumber([1,2,3,4,5],function (data) {
      console.log(data)
});
