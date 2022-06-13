var express = require('express');
var auth    = require('./auth');
const verifikasi = require('./verifikasi.js');
var router  = express.Router();
// const {check , validationResult} = require('express-validator');

// daftarkan menu registrasi
router.post('/register',auth.register);
router.post('/login',auth.login);
// alamat yang perlu authorisasi
router.get("/rahasia",verifikasi(),auth.halamanrahasia);


module.exports = router;