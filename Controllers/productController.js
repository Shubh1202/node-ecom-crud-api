const categoryModel = require("../Models/categoryModel")
const productModel = require("../Models/productModel")
const mongoose = require("mongoose")

module.exports.createProduct = (async (req, res) => {
    try {

        if(!mongoose.isValidObjectId(req.body.category)){
            const obj = {status: 'error', msg:"Provide valid category id."}
            return res.status(422).send(obj)
        }
        
        const existCategory = await categoryModel.findById(req.body.category)
        if(!existCategory){
            const obj = {status: 'error', msg:"Provide valid category id."}
            return res.status(422).send(obj)
        }

        const bodyObj = req.body
        const product = new productModel(bodyObj)
        product.save().then((data)=>{
            const obj = {status: 'success', msg:"Product sucessfully created"}
            return res.status(200).send(obj)
        }).catch((err)=>{
            const msg = `Something went wrong \n ${err}`
            return res.status(422).send(msg)
        })
    } catch (err) {
        const msg = `An error occured while creating product \n ${err}`
        return res.status(500).send(msg)
    }
})

module.exports.updateProduct = (async (req, res) => {
    try {
        const bodyObj = req.body
        const id = req.body.id

        if(!id){
            const obj = {status: 'error', msg:"Product ID is rquired for update."}
            return res.status(422).send(obj)
        }

        const dbRes = await productModel.findByIdAndUpdate(id, bodyObj, {new: true})

        if(!dbRes){
            const obj = {status: 'error', msg:`Product ID is invalid for update.`}
            return res.status(422).send(obj)
        }

        const obj = {status: 'success', msg:`Product sucessfully updated.`, result:dbRes}
        return res.status(200).send(obj)

    } catch (err) {
        const msg = `An error occured while updating product \n ${err}`
        return res.status(500).send(msg)
    }
})

module.exports.deleteProduct = (async (req, res) => {
    try {
        const id = req.body.id

        if(!id){
            const obj = {status: 'error', msg:"Product ID is rquired for delete."}
            return res.status(422).send(obj)
        }        
        const dbRes = await productModel.findByIdAndDelete(id)

        if(!dbRes){
            const obj = {status: 'error', msg:`Product ID is invalid for delete.`}
            return res.status(422).send(obj)
        }

        const obj = {status: 'success', msg:`Product sucessfully deleted.`}
        return res.status(200).send(obj)
    } catch (err) {
        const msg = `An error occured while deleting product \n ${err}`
        return res.status(500).send(msg)
    }
})

module.exports.listProduct = (async (req, res) => {
    try {

        const filter = {}

        if(req.query.category){
            const prx = req.query.category.split(',')
            filter.category = prx
        }

        // return res.send(filter)
        const list = await productModel.find(filter).populate('category')

        if(list.length==0){
            const obj = {status: 'error', msg:`Product list not found.`}
            return res.status(422).send(obj)
        }


        const obj = {status: 'success', msg:`Product sucessfully get.`, result: list}
        return res.status(200).send(obj)

    } catch (err) {
        const msg = `An error occured while getting list product \n ${err}`
        return res.status(500).send(msg)
    }
})

module.exports.getProductById = (async (req, res)=>{
    try{
        const id = req.params.id

        if(!mongoose.isValidObjectId(id)){
            const obj = {status: 'error', msg:`Invalid product id.`}
            return res.status(422).send(obj)
        }

        const product = await productModel.findById(id).populate('category')

        if(!product){
            const obj = {status: 'error', msg:`Product not found.`}
            return res.status(422).send(obj)
        }

        const obj = {status: 'success', msg:`Product found.`, result: product}
        return res.status(200).send(obj)
    }catch(err){
        const msg = `An error occured while getting selected product detail \n ${err}`
        return res.status(500).send(msg)
    }
})

module.exports.featuredProduct = (async (req, res)=>{
    try{
        const obj = {status: 'success', msg:`featured products`}
        return res.status(200).send(obj)
    }catch(err){
        const msg = `An error occured while getting featured product detail \n ${err}`
        return res.status(500).send(msg)
    }
})