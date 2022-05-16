const express = require('express')
const router = new express.Router()
const Product = require('../models/product')

router.post('/products' , async (req,res) => {
    const product = new Product(req.body)
    try {
     await product.save()
     res.status(201).send(product)
    } catch(e) {
     res.status(400).send(e)
    }
 })
 
 
 router.get('/products' , async (req,res) => {
     try {
      const product = await Product.find({})
      res.send(product)
     } catch(e) {
         res.status(500).send(e)
     }
 })
 
 router.get('/products/:category' ,async (req , res) =>{
 
    const category = req.params.category
    
    try {
   const product = await Product.find({category})
   if(!product) {
       return res.status(404).send()
   }
   res.send(product)
    } catch(e) {
   res.status(500).send()
    }
})

 
 router.get('/products/:id' ,async (req , res) =>{
 
     const _id = req.params.id
     
     try {
    const product = await Product.findById(_id)
    if(!product) {
        return res.status(404).send()
    }
    res.send(product)
     } catch(e) {
    res.status(500).send()
     }
 })
 
 router.patch('/products/:id' , async(req, res) => {
     try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true} )
      if(!product) {
          return res.status(404).send()
      }
      res.send(product)
     }
     catch(e) {
      res.status(400).send(e)
     }
 })
 
 router.delete('/products/:id' , async( req , res) => {
      
     try {
      const product = await Product.findByIdAndDelete(req.params.id)
     if(!product) {
         return res.status(404).send()
     }
     res.send(product)
     } catch(e) {
 res.status(500).send()
     }
 })

module.exports = router