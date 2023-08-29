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



const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/model')
const alert=require('alert')


router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username:req.body.username,
        password: User.hashPassword(req.body.password),
    })

    const result = await user.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req, res) => {

    console.log(req.body);
    const{username,password}=req.body;
    console.log(req.body.username);
    console.log(req.body.password);
    let user = await User.findOne(req.body.username)
    console.log(user);

    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        alert("Invalid Credentials")
        return res.status(400).send({
            message: 'invalid credentials'
        })
      
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
})

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})
module.exports = router;