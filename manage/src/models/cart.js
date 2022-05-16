const mongoose = require('mongoose')

const Cart = mongoose.model('Cart', {
    name : {
        type : String
    },
    description : {
        type : String
    },
    image : {
        type : String
    },
    quantity : {
        type : Number
    },
    showdata : {
        type : Boolean
    },
    category : {
        type : String
    },
    price : {
        type : Number
    },
    total : {
        type : Number
    },
    amount : {
        type : Number
    },    
 })

 module.exports = Cart