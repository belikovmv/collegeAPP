const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);


  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('That user already exisits!');
    // return res.render('auth',{error, })
  } else {

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.redirect('/enter')
  }
});

module.exports = router;