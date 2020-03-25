const { User, validate } = require('../models/user');
const cookieParser = require('cookie-parser')
const auth = require('../routes/auth');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// const isAuthenticated = (req, res, next) => {

//     if (cookie) {
//         try {
//             var name = jwt.decode(req.headers['cookie'], 'PrivateKey').name
//         } catch (err) {
//             return res.sendStatus(401);
//         }
//         User.findOne({ name: name })
//         if (err) {
//             return res.sendStatus(500)
//         } // ошибка БД
//         if (!user) {
//             return res.sendStatus(401)
//             // пользователя нет в БД
//         }
//         next();
//     }


//     module.exports(isAuthenticated);


// }
/**
* 1. Check cookie for token
* 2. Check token is valid
* 3. Check user by token (???)
* 4.1. If something wrong => send 401
* 4.2. If ok => next()
*/

/**
 * const user = db.findUser()
 * req.user  = user
 */
