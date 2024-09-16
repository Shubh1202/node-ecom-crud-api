const userModel = require("../Models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.createUser = (async (req, res)=>{
    try{
        const boydObj = req.body
        boydObj.password = await bcryptjs.hashSync((boydObj.password), 10)
        // const salt = await bcryptjs.genSaltSync()

        const dbRes = await new userModel(boydObj).save()
        if(!dbRes){
            const obj = {status:422, msg:`User registration faild`}
            return res.status(422).send(obj)
        }

        const obj = {status:200, msg:`User successfully registered.`}
        return res.status(200).send(obj)

        
    }catch(err){
        const obj = `An error occured while creating user \n ${err}`
        return res.status(500).send(obj)
    }
})

module.exports.updateUser = (async (req, res)=>{
    try{

        const bodyObj = req.body
        bodyObj.password = await bcryptjs.hashSync(bodyObj.password)

        const dbRes = await userModel.findByIdAndUpdate(req.body.id, bodyObj, {new: true})
        
        if(!dbRes){
            const obj = {status:422, msg:`User updation faild due to invalid id or user not exist`}
            return res.status(422).send(obj)
        }

        const obj = {status:200, msg:`User successfully updated.`, result: dbRes}
        return res.status(200).send(obj)

    }catch(err){
        const obj = `An error occured while updating user \n ${err}`
        return res.status(500).send(obj)
    }
})

module.exports.listUser = (async (req, res)=>{
    try{

        const dbRes = await userModel.find({}).select(['-password','-otp','-otp_status','-isAdmin'])

        if(!dbRes){
            const obj = {status:422, msg:`Users list empty`}
            return res.status(422).send(obj)
        }


        const obj = {status:200, msg:`Users list successfully get.`, result: dbRes}
        return res.status(200).send(obj)
    }catch(err){
        const obj = `An error occured while getting list user \n ${err}`
        return res.status(500).send(obj)
    }
})

module.exports.getByIdUser = (async (req, res)=>{
    try{
        const dbRes = await userModel.findById(req.params.id).select(['-password','-otp','-otp_status','-isAdmin'])

        if(!dbRes){
            const obj = {status:422, msg:`User not exist for getting detail`}
            return res.status(422).send(obj)
        }

        const obj = {status:200, msg:`Successfully getting user detail.`, result: dbRes}
        return res.status(200).send(obj)

    }catch(err){
        const obj = `An error occured while geting user \n ${err}`
        return res.status(500).send(obj)
    }
})

module.exports.deleteUser = (async (req, res)=>{
    try{

        const dbRes = await userModel.findByIdAndDelete(req.body.id)

        if(!dbRes){
            const obj = {status:422, msg:`User not exist for deletion`}
            return res.status(422).send(obj)
        }

        const obj = {status:200, msg:`User successfully deleted.`, }
        return res.status(200).send(obj)


    }catch(err){
        const obj = `An error occured while deleting user \n ${err}`
        return res.status(500).send(obj)
    }
})


module.exports.loginUser = (async (req, res)=>{
    try{
        const bodyObj = req.body
        const email = bodyObj.email
        const password = bodyObj.password

        if(!bodyObj || !email || !password){
            const obj = {status:422, msg:`Email or password is rquired.`}
            return res.status(422).send(obj)
        }

        const dbRes = await userModel.findOne({email:email})
        if(!dbRes || !await bcryptjs.compareSync(password, dbRes.password)){
            const obj = {status:422, msg:`Enter valid user detail.`}
            return res.status(422).send(obj)
        }

        const secret = process.env.JWT_TOKEN_SECRET
        const algorithm = process.env.JWT_TOKEN_ALGORITHM
        const token = await jwt.sign({
            userId: dbRes.id, 
            isAdmin: dbRes.isAdmin 
        },
        secret,  
        {expiresIn: '1d'}
        )


        const obj = {status:422, msg:`User successfully login.`, token: token}
        return res.status(422).send(obj)

    }catch(err){
        const obj = `An error occured while user login \n ${err}`
        return res.status(500).send(obj)
    }
})