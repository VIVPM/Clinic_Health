// const express = require("express");
// const route = express.Router();
// const bcrypt = require('bcryptjs');
// // const cookieParser = require('cookie-parser')
// const controller = require("../controller/controllers");
// var User = require('../model/model');
// var jwt = require("jsonwebtoken");

// // route.post("/signup", controller.store);

// route.post('/register', async (req, res) => {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(req.body.password, salt)

//     const user = new User({
//         // name: req.body.name,
//         name:req.body.name,
//         email: req.body.email,
//         username: req.body.username,
//         password: User.hashPassword(req.body.password),
//         phone:req.body.phone
//     })

//     const result = await user.save()

//     const {password, ...data} = await result.toJSON()

//     res.send(data)
// })

// module.exports = route;

// route.post('/SignUp',  function(req,res,next){
//   var user = new User({
//     name:req.body.name,
//     email: req.body.email,
//     username: req.body.username,
//     password: User.hashPassword(req.body.password),
//     phone:req.body.phone,
//     creation_dt: Date.now()
//   });

//   let promise = user.save();

//   promise.then(function(doc){
//     return res.status(201).json(doc);
//   })

//   promise.catch(function(err){
//     return res.status(501).json({message: 'Error registering user.'})
//   })
// })

// const services=require('../services/render');
// const controller=require('D:/Clinic2/backend/server/controller/controllers.js');

// route.get('/',services.homeRoutes);

// route.get('/add-patient',services.add_user);

// route.get('/update-patient',services.update_user);

// //API
// route.post('/api/users',controller.create);
// route.get('/api/users',controller.find);
// route.put('/api/users/:id',controller.update);
// route.delete('/api/users/:id',controller.delete);



// const router = require('express').Router()
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const User = require('../model/model')
// const alert=require('alert')


// router.post('/register', async (req, res) => {
//     const salt = await bcrypt.genSalt(10)
//     // const hashedPassword = await bcrypt.hash(req.body.password, salt)

//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         username:req.body.username,
//         password: User.hashPassword(req.body.password),
//     })

//     const result = await user.save()

//     const {password, ...data} = await result.toJSON()

//     res.send(data)
// })

// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//       return res.status(404).send({
//         message: 'User not found'
//       });
//     }

//     // Validate password using the isValid method
//     if (!user.isValid(password)) {
//       return res.status(400).send({
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

//     // Set cookie
//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     });

//     res.send({
//       message: 'Login successful'
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       message: 'An error occurred during login'
//     });
//   }
// });

// router.get('/user', async (req, res) => {
//     try {
//         const cookie = req.cookies['jwt']

//         const claims = jwt.verify(cookie, 'secret')

//         if (!claims) {
//             return res.status(401).send({
//                 message: 'unauthenticated'
//             })
//         }

//         const user = await User.findOne({_id: claims._id})

//         const {password, ...data} = await user.toJSON()

//         res.send(data)
//     } catch (e) {
//         return res.status(401).send({
//             message: 'unauthenticated'
//         })
//     }
// })

// router.post('/logout', (req, res) => {
//     res.cookie('jwt', '', {maxAge: 0})

//     res.send({
//         message: 'success'
//     })
// })
// module.exports = router;

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/model');

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: User.hashPassword(req.body.password),
    });

    const result = await user.save();
    const { password, ...data } = result.toJSON();

    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if password exists in the user document
    if (!user.password) {
      console.error("Hashed password is missing for the user:", user);
      return res.status(500).send({ message: 'Invalid user data' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, 'secret');
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.send({ message: 'Login successful' });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, 'secret');

    if (!claims) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = user.toJSON();

    res.send(data);
  } catch (e) {
    res.status(401).send({ message: 'Unauthenticated' });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.send({ message: 'success' });
});

module.exports = router;
