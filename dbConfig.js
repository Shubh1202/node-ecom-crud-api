const mongoose = require("mongoose")
const connecionString = "mongodb://127.0.0.1:27017/ecom?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0"

module.exports.dbConnection = (async() => {

try{
    await mongoose.connect(connecionString)
    .then((result)=> console.log(`Database connected successfully on -> ${result}`))
    .catch((err) => console.log(`Connection faild due to --> ${err}`))
}catch(err){
    console.log(err)
}
})
