const express = require('express')
const router = express.Router()
const {authCheck,adminCheck}  =require('../middlewares/authCheck')
const {
        listUsers,
        changeStatus,
        changeRole,
        userCart,
        getUserCart,
        emptyCart,
        saveAddress,
        saveOrder,
        getOrder,
        

}  =require('../controllers/user')

router.get('/users',authCheck,listUsers)
router.post('/change-status',authCheck,changeStatus)
router.post('/change-role',authCheck,changeRole)

router.post('/user/cart',authCheck,userCart)
router.get('/user/cart',authCheck,getUserCart)
router.delete('/user/cart',authCheck,emptyCart)

router.post('/user/address',authCheck,saveAddress)

router.post('/user/order',authCheck,saveOrder)
router.get('/user/order',authCheck,getOrder)


module.exports= router  