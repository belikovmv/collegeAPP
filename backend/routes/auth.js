const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const jsonParser = express.json();


router.post('/', jsonParser, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });


  if (!user) {
    return res.status(400).json({ error: 'User does not exist' });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Pass is wrong' });
  }
  const token = jwt.sign({ _id: user._id, name: user.name }, 'PrivateKey', { expiresIn: 129600 });
  res.cookie('token', token);
  return res.json({ ok: 'OK' })
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;