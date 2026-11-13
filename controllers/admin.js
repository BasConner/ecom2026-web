const prisma = require("../config/prisma")

exports.changeOrderStatus = async (req,res)=> {
    try{
        const {orderId,orderStatus} = req.body

        const OrderUpdate = await prisma.order.update({
            where:{id: orderId},
            date:{orderStatus:orderStatus}
        })
        res.json(OrderUpdate)
    } catch(err){
        console.log(err)
        res.orderStatus(500).json({messga:"Server Erro"})
    }
}
exports.getOrderAdmin = async(req,res)=>{
    try{
        const order = await prisma.order.findMany({
            include:{
                products:{
                    include:{
                        product:true
                    }
                },
                orderedBy:{
                    select:{
                        id:true,
                        email: true,
                        address:true,
                    }
                }
            }
        })
        res.json(order)
    } catch (err){
        console.log(err)
        res.status(500).json({messga:"Server Error"})
    }
}