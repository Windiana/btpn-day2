
function oddValue(num, callback) {
  var arr = []
  for (let i=0; i<num.length; i++) {
    if (num[i] % 2 != 0) {
      arr.push(num[i])
    }
  }callback(arr)
}

oddValue([1,2,3,4,7,8], function (hasilData) {
  console.log(hasilData)
})