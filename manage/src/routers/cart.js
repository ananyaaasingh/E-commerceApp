const express = require('express')
const router = new express.Router()
const Cart = require('../models/cart')

router.post('/cart' , async (req,res) => {
    const cart = new Cart(req.body)
    try {
     await cart.save()
     res.status(201).send(cart)
    } catch(e) {
     res.status(400).send(e)
    }

 })
 
 
 router.get('/cart' , async (req,res) => {
 
 
     try {
      const cart = await Cart.find({})
      res.send(cart)
     } catch(e) {
         res.status(500).send(e)
     }
 })
 
 
 
 router.get('/cart/:id' ,async (req , res) =>{
 
     const _id = req.params.id
     
     try {
    const cart = await Cart.findById(_id)
    if(!cart) {
        return res.status(404).send()
    }
    res.send(cart)
     } catch(e) {
    res.status(500).send()
     }
 })
 
 router.patch('/cart/:id' , async(req, res) => {
   
     try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true} )
      if(!cart) {
          return res.status(404).send()
      }
      res.send(cart)
     }
     catch(e) {
      res.status(400).send(e)
     }
 })
 
 router.delete('/cart/:id' , async( req , res) => {
      
     try {
      const cart = await Cart.findByIdAndDelete(req.params.id)
     if(!cart) {
         return res.status(404).send()
     }
     res.send(cart)
     } catch(e) {
 res.status(500).send()
     }
 })

module.exports = router