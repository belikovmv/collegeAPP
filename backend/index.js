const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const self = require("./routes/self")
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express();
const { User } = require('./models/user');
const util = require('util');





mongoose.connect(
  "mongodb://localhost/mongo-games",
  { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

app.use(express.json())
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.set('view engine', 'handlebars');

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/enter');
})

// app.use('/enter', (req, res, next) => {
//   next();
// })





const isAuthenticated = (req, res, next) => {
  let token = req.cookies.token;
  // console.log(token);
  if (token) {
    jwt.verify(req.cookies.token, 'PrivateKey', function (err, decoded) {
      if (err) {
        return res.sendStatus(401)
      }
      decoded = jwt.decode(req.cookies.token, 'PrivateKey')
      if (!decoded) {
        return res.sendStatus(403);
      }
      req.user = decoded
      return next()

    });
  }
  else {
    console.log("No token");
    return res.status(403).json({ message: 'Token is missing' });
  }
}


app.get('/enter', isAuthenticated, (req, res, ) => {
  if (req.user) {
    return res.redirect('/home1')
  }
  res.render("Enter.hbs");
})

app.get("/home1", isAuthenticated, (req, res) => {
  const { user } = req;
  User.findOne({ name: user.name }, function (err, user) {
    if (err) {
      return res.sendStatus(403);
    }
    // req.query.user.id = jwt.decode(req.cookies.token, 'PrivateKey').id;
    res.render('SelfInfo.hbs', {
      firstname: user.firstname,
      lastname: user.lastname,
      phonenumber: user.phonenumber,
      country: user.country
    });
  })
})

const getUserAsync = util.promisify(User.findOne)

// -----------------------

try {
  const user = await getUserAsync({ name: user.name })

} catch (err) {
  return res.status(403).json({ error: 'oops' })
}

// -----------------------

getUserAsync = async (args) => {
  return new Promise((resolve, reject) => {
    User.findOne(args, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}


// ------------------------

app.get('/', (req, res) => {

  res.render("index.hbs")
});

app.use(express.json());
app.use('/api/users', users);
app.use('/enter', auth);
app.use('/home1/:_id', self)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

