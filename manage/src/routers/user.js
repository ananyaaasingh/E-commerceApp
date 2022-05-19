const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/user/register' , async (req,res) => {
    const user = new User(req.body)
    try {
     await user.save()
     jwt.sign({user}, 'secretkey', (err , token) => {
        res.json({
            token : token
        });
     })
    } catch(e) {
     res.status(400).send(e)
    }
 })

 router.get('/user/login' , verifyToken, (req,res) => {
    const user = new User(req.body)
    jwt.verify(req.token, 'secretkey', (err, authdata) => {
        if(err){
            res.status(403).send()
        }
        else{
             user.save()
                res.json({
                    message : 'logged in',
                    authdata
                })
                res.status(201).send(user)
               
        }
    })
    
 })
 
 router.get('/user' , async (req,res) => {
 
 
     try {
      const user = await User.find({})
      res.send(user)
     } catch(e) {
         res.status(500).send(e)
     }
 })
 
 
 
 router.get('/user/:id' ,async (req , res) =>{
 
     const _id = req.params.id
     
     try {
    const user = await User.findById(_id)
    if(!user) {
        return res.status(404).send()
    }
    res.send(user)
     } catch(e) {
    res.status(500).send()
     }
 })
 
 router.patch('/user/:id' , async(req, res) => {
   
     try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true} )
      if(!user) {
          return res.status(404).send()
      }
      res.send(user).status(201).send()
     }
     catch(e) {
      res.status(400).send(e)
     }
 })
 
 router.delete('/user/:id' , async( req , res) => {
      
     try {
      const user = await User.findByIdAndDelete(req.params.id)
     if(!user) {
         return res.status(404).send()
     }
     res.send(user)
     } catch(e) {
 res.status(500).send()
     }
 })

 function verifyToken(req,res,next){
    const auth = req.headers['authorization'];
    if(typeof auth !== 'undefined'){
    const Bearer = auth.split(' ');
    const authToken = Bearer[1];
    req.token = authToken;
    next();
     }
     else {
         res.status(403).send()
     }
 }

module.exports = router