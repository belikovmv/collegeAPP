const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  let token = req.cookies.token;
  let userName = jwt.decode(token, 'PrivateKey').name;
  await User.updateOne({ name: userName }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    country: req.body.country
  }, function (err) {
    if (err) {
      console.log(err);
    }
  })

  res.redirect('/home1')
});


module.exports = router;