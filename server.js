const express = require("express")
require("dotenv/config");
const dbConnection = require("./dbConfig")
const morgan = require("morgan")
const Routes = require("./Routes/index")
const authJWT = require("./helpers/jwt")
const errorHandler = require("./helpers/error-handler")

const app = express()
const PORT = process.env.PORT || 5005
const HOST_NAME = process.env.HOST_NAME
const API_URL = process.env.API_URL

app.use(morgan("tiny"))
dbConnection.dbConnection()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(authJWT())

app.use(API_URL, Routes)

app.use((req, res, next)=>{
    // next()
    return res.status(400).send(`404 page not found `)
})

app.use((err, req, res, next)=>{
    if(err){
        errorHandler(err, req, res, next)
    }
})


app.listen(PORT, (err)=>{
    console.log(`Server running url http://${HOST_NAME}:${PORT}`)
    console.log(`Server API running url http://${HOST_NAME}:${PORT}${API_URL}`)
})

