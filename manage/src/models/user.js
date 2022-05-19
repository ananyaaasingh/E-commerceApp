// const mongoose = require('mongoose')

// const User = mongoose.model('User', {
//     name :String
//     
//     number :Number
//     
//     pincode : Number
//     
//     flat :  String
//     
//     area :  String
//     
//     town :  String
//     
//     State :  String
//     
//  })

//  module.exports = User

const mongoose = require('mongoose')

const User = mongoose.model('User' , {
    name : String,
    email : String,
    number : Number,
    password : String,
    cartData : [
        {
            productName : String,
            description : String,
            image : String,
            quantity : Number,
            showData : Boolean,
            category : String,
            price : Number,
            total : Number,
            amount : Number
        }
    ],
    savedAddress : [
        {
            reciepentName :String,
            reciepentNumber :Number,
            pincode : Number,
            flat :  String,
            area :  String,
            town :  String,
            State :  String
        }
    ]
})

module.exports = User