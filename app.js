const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
const bodyParser=require("body-parser")
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
const path = require('path');
const web = require('./routes/web.js')
const cors = require('cors')


app.use(cors())

//for API, use like bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//bodyparse
// app.use(bodyParser.urlencoded({extended:false}))

//file upload
app.use(fileUpload({useTempFiles: true}));

//cookies
app.use(cookieParser())

//require web file


//load routing
app.use('/',web)



//env file setup
dotenv.config({
    path: '.env'
})

//setup of templating engine
app.set('view engine','ejs')

//link public folder
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'uploads')));

//db connection
connectDB()


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at localhost:${process.env.PORT}`)
})