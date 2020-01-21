const model = require('../models');
var jwt = require('jsonwebtoken')
exports.checkAuth = (req,res,next) =>{
  try {
    let token = req.headers.authorization;
    jwt.verify(token,process.env.TOKEN,(err,next)=>{
      if(err){
        res.status(400).json({
          message:"token invalid"
        })
      }
    })
  }catch (err) {
    return next(err)
  }
  next();
}