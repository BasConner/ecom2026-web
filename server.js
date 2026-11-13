const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs') // นำเข้า fs โมดูล

// middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())

// แก้ไขเป็น fs.readdirSync และตรวจสอบชื่อโฟลเดอร์ให้ตรงกัน (เช่น ./routes/)
fs.readdirSync('./routes').map((c) => 
    app.use('/api', require('./routes/' + c))
)

// Step 2 Start Server
app.listen(5001, () => console.log('Server is running on port 5001'))