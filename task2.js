
const isOddNumber = (num) => {
  return new Promise((resolve, reject) => {
    let newArray = []
    let isArray = false

    for (let i=0; i < num.length; i++){
      if (num[i] % 2 === 1){
        newArray.push(num[i])
        isArray = true
      }
    }

    if(isArray){
      resolve(newArray)
    } else {
      reject(isArray)
    }

  });
};

isOddNumber([1,2,3,4,5,6,7,8,9,10]).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
