const orderItemsModel = require("../Models/orderItemsModel")
const orderModel = require("../Models/orderModel")
const { statusObj } = require("../helpers/functions")


module.exports.createOrder = (async (req, res)=>{
    try{
        const bodyObj = req.body

        const orderItems = req.body.orderItems


        const array = await Promise.all(orderItems.map(async (data, index)=>{
            const prx = await new orderItemsModel(data).save()
            return prx._id
        }))

        if(!array){
            const obj = {status:"error", msg:`Something went wrong. Please try again later.`}
            return res.status(400).send(obj)
        }

        const getPrice = await Promise.all(array.map(async (data) => {
            const productInfo = await orderItemsModel.findById(data).populate('product', ['stock', 'mrp', 'sale_price'])
            return productInfo.product.sale_price*productInfo.qty
        }))

        const totalPrice = getPrice.reduce((sum, price)=>{
            return sum + price
        })

        bodyObj.orderItemIds = array
        bodyObj.totalPrice = totalPrice

        const dbRes = await orderModel(req.body).save()
        if(!dbRes){
            const obj = {status:"error", msg:`Currently you order could not be place.`}
            return res.status(400).send(obj)
        }
        const obj = {status:"success", msg:`Order successfully placed.`}
        return res.status(200).send(obj)
    }catch(err){
        const obj = {status:"error", msg:`${err}`}
        return res.status(500).send(obj)
    }
})

module.exports.updateOrder = (async (req, res)=>{
    try{

        let updateObj = {}
        updateObj.stauts = req.body.status
        const id = req.body.id

        const dbRes = await orderModel.findByIdAndUpdate(id, updateObj, {new: true})
        if(!dbRes){
            const obj = {status:"error", msg:`Order not found for update.`}
            return res.status(400).send(obj)
        }
        const obj = {status:"success", msg:`Order successfully updated.`, result: dbRes}
        return res.status(200).send(obj)
    }catch(err){
        const obj = {status:"error", msg:`${err}`}
        return res.status(500).send(obj)
    }
})

module.exports.listOrder = (async (req, res)=>{
    try{
        let filters = {}

        const dbRes = await orderModel.find(filters)
        .populate('user',['name', 'phone'])
        .populate({path: 'orderItemIds', populate: {path:'product', populate:'category'}})
        .select(["-password"]).sort({orderDate: -1})
        if(!dbRes){
            const obj = {status:"error", msg:`Orders list not found`}
            return res.status(400).send(obj)
        }
        const obj = {status:"success", msg:`Order list successfully get.`, result: dbRes}
        return res.status(200).send(obj)
    }catch(err){
        const obj = {status:"error", msg:`${err}`}
        return res.status(500).send(obj)
    }
})

module.exports.getByIdOrder = (async (req, res)=>{
    try{
        const id = req.body.id || req.params.id

        const dbRes = await orderModel.findById(id)
        .populate('user', ['name', 'phone'])
        .populate({path: 'orderItemIds', populate: {path: 'product', populate:'category',}})

        if(!dbRes){
            const obj = {status:"error", msg:`Order not found`}
            return res.status(400).send(obj)
        }
        const obj = {status:"success", msg:`Order successfully get.`, result: dbRes}
        return res.status(200).send(obj)
    }catch(err){
        const obj = {status:"error", msg:`${err}`}
        return res.status(500).send(obj)
    }
})

module.exports.deleteOrder = (async (req, res)=>{
    try{
        const id = req.body.id || req.params.id

        orderModel.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                const obj = {status:"error", msg:`Order not found for deletion.`}
                return res.status(400).send(obj)
            } 

            if(data){
                data.orderItemIds.map(async (ids)=>{
                    await orderItemsModel.findByIdAndDelete(ids)
                })
                const obj = {status:"success", msg:`Order successfully deleted`}
                return res.status(200).send(obj)
            }
            console.log(data)
        }).catch(err => {
            const obj = {status:"error", msg:`Something went wrong, please try again later`}
            return res.status(500).send(obj)
        })

        /*
        let dbRes = await orderModel.findByIdAndRemove(id)
        if(!dbRes){
            const obj = {status:"error", msg:`Order not found for deletion.`}
            return res.status(400).send(obj)
        }

        dbRes.orderItemIds.map(async (ids)=>{
            await orderItemsModel.findByIdAndDelete(ids)
        })

        const obj = {status:"success", msg:`Order successfully deleted.`}
        return res.status(200).send(obj)
        */
    }catch(err){
        const obj = {status:"error", msg:`${err}`}
        return res.status(500).send(obj)
    }
})

module.exports.getTotalSales = (async (req, res)=>{
    try{
        const data = await orderModel.aggregate([
            {
                $group: {_id:null, totalSales: {$sum: '$totalPrice'}}
            }
        ])

        if(!data){
            const obj = {status:'error', msg:`Order total sales not found.`}
            return res.status(400).send(obj)
        }

        const totalSales = data.pop().totalSales

        const obj = {status:'success', msg:`Total sales successfully get`, result: totalSales}
        return res.status(200).send(obj)
    }catch(err){
        console.error(err)
        const obj = {status:'error', msg:'Something went wrong for getting total order sales'}
        return res.status(500).send(obj)
    }
})


module.exports.getCountOrder = (async (req, res)=>{
    try{

        const countDocs = await orderModel.countDocuments({})

        if(!countDocs){
            const obj = {stauts:'error', msg: `Order not found`}
            return res.status(400).send(obj)
        }

        const obj = {status: 'success', msg:'Order count successfully get', result: countDocs}
        return res.status(200).send(obj)


    }catch(err){
        console.error(err)
        const obj = {status:'error', msg: `Something went wrong for getting order count`}
        return res.status(500).send(obj)
    }
})


module.exports.getUserOrder = (async (req, res)=>{
    try{

        const userid  = req.params.userid || req.body.userid
        const searchBy = {user: userid}
        const userOrderList = await orderModel.find(searchBy).populate({path: 'orderItemIds', populate: {path: 'product', populate: 'category'}}).sort({orderDate: -1})

        if(!userOrderList){
            const obj = {status:'error', msg: `User order list not found`}
            return res.status(400).send(obj)
        }

        const obj = {status:'success', msg: `User order list successfully get`, result: userOrderList}
        return res.status(200).send(obj)

    }catch(err){
        console.error(err)
        const obj = {status:'error', msg: `Something went wrong for getting user order list`}
        return res.status(500).send(obj)
    }
})