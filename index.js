const express = require('express')
const cookieParser = require('cookie-parser')
const body = require('body-parser')
const cors = require('cors')
const connection = require('./conn/db')
const dotenv = require('dotenv')
dotenv.config({path:'./config/.env'});
const imageRoute = require("./route/images")

const app = express();
app.use(cors({credentials:true, origin:"http://localhost:3000",  methods: "GET,POST,PUT,DELETE",}))
app.use(cookieParser())
app.use(express.json())
app.use(body.urlencoded({extended:false}))
connection();
app.use('/image', imageRoute)

app.listen(process.env.PORT,() => {
    console.log(`Your Server Running on ${process.env.PORT}`);
})