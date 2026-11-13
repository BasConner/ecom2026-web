const express = require('express')
const router = express.Router()
const { register, login, currentUser } = require('../controllers/auth')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// Route สำหรับสมัครสมาชิกและเข้าสู่ระบบ (ไม่ต้องใช้ authCheck)
router.post('/register', register)
router.post('/login', login) // 👈 เอา authCheck ออกตรงนี้ครับ

// Route สำหรับเช็กสถานะผู้ใช้ที่ล็อกอินอยู่ (ต้องใช้ authCheck)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck,adminCheck, currentUser) // 👈 เพิ่ม authCheck ตรงนี้ครับ

module.exports = router