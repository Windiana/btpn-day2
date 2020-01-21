var express = require('express');
var router = express.Router();

var userController= require("../controller/userController")
var kelasController = require("../controller/kelasController")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
  res.json({ok: true})
})

router.get("/api/user/:userId/transaction", userController.getUserTransaction);

router.get("/api/user/:userId/kelas", userController.getUserKelas);
router.post("/api/user/:userId/kelas", userController.addUserKelas);

router.get("/api/kelas/:kelasId", kelasController.getKelasUser);
router.post("/api/kelas", kelasController.createKelas);

module.exports = router;
