const express = require('express')
require('./db/mongoose')
const Product = require('./models/product')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const userRouter = require('./routers/user')

const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(productRouter)
app.use(cartRouter)
app.use(userRouter)

app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST , OPTIONS , PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers' , 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials' , true);
    next();
});


app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 