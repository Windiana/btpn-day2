var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController')
var jwt = require('jsonwebtoken')

/* GET users listing. */
async function checkAuth(req, res, next){
  try{
  let token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      res.status(400).json({
        status: 'Invalid Token',
        message: 'Token Salah atau Token Telah Berubah'
      })
    }
  })}
  catch (err){
   return  next(err)
  }
    next();
}

router.get('/', checkAuth, function(req, res, next)  {
  userController.list(res);
});

router.post('/', function(req, res, next) {
  userController.add(req, res);
});
router.delete('/:id', function(req, res, next) {
  userController.delete(req, res);
});
router.put('/:id', function(req, res, next) {
  userController.update(req, res);
});
router.post('/register', function (req,res,next) {
  userController.register(req, res);
});
router.post('/login', function (req,res,next) {
  userController.login(req, res);
});
router.get('/userTransaction/:id', function (req, res, next) {
  userController.findTransactionByUser(req, res);
})
module.exports = router;

