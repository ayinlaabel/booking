var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/patient', (req, res) => {
  res.render('patient');
});
router.get('/appointment', (req, res) => {
  res.render('appoint');
});
router.get('/department', (req, res) => {
  res.render('department');
});

router.get('/doctor', (req, res) => {
  res.render('doctors');
});
router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact.html', (req, res) => {
  res.render('contact');
});

module.exports = router;
