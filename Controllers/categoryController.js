const { default: mongoose } = require("mongoose")
const categoryModel = require("../Models/categoryModel")


module.exports.categoriesList = (async (req, res) => {

    try {
        const list = await categoryModel.find({})
        const resObj = {status:200, msg:"Category list successfully fetch", result: list}
        return res.status(200).send(resObj)

    } catch (err) {
        return res.status(500).send(`An error occured while fetching product category list \n ${err}`)
    }
})

module.exports.createCategory = (async (req, res) => {
    try {
        const bodyObj = req.body
        const dbResponse = await new categoryModel(bodyObj).save()

        if(!dbResponse){
            const resObj = {status:400, msg:"Category creation faild.",}
            return res.status(400).send(resObj)
        }

        const resObj = {status:200, msg:"Category successfully created", result: dbResponse}
        return res.status(200).send(resObj)

    } catch (err) {
        return res.status(500).send(`An error occured while creating product category \n ${err}`)
    }
})

module.exports.updateCategory = (async (req, res)=>{
    try{
        const id = req.body.id
        if(!id){
            return res.status(400).send(`Category ID is required`)
        }
        const bodyObj = req.body
        const dbRes = await categoryModel.updateOne({_id:id}, bodyObj)
        const resObj = {status:200, msg:"Category successfully updated", result: dbRes}
        return res.status(200).send(resObj)
    }catch(err){
        return res.status(500).send(`An error occured while updating product category \n ${err}`)
    }
})

module.exports.deleteCategory = (async (req, res)=>{
    try{
        const id = new mongoose.Types.ObjectId(req.body.id)
        if(!id){
            return res.status(400).send(`Category ID is required`)
        }
        const dbRes = await categoryModel.findByIdAndDelete(id)

        if(!dbRes){
            const resObj = {status:422, msg:"Category cannot be deleted"}
            return res.status(422).send(resObj)
        }

        const resObj = {status:200, msg:"Category successfully deleted", result: dbRes}
        return res.status(200).send(resObj)

    }catch(err){
        return res.status(500).send(`An error occured while deleting product category \n ${err}`)
    }
})

module.exports.getCategoryById = (async (req, res)=>{
    try{
        const id = new mongoose.Types.ObjectId(req.params.id)
        if(!id){
            return res.status(400).send(`Category ID is required`)
        }
        const dbRes = await categoryModel.findById(id)
        const resObj = {status:200, msg:"Category successfully get", result: dbRes}
        return res.status(200).send(resObj)
  
    }catch(err){
        return res.status(500).send(`An error occured while fetching product category by ID\n ${err}`)
    }
})