require('dotenv').config() // ต้องอยู่บรรทัดแรกเสมอ
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

// middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())

// โหลดทุกไฟล์ในโฟลเดอร์ routes (ใช้ path แบบเต็ม ใช้ได้ทั้งในเครื่องและบน Vercel)
const routesPath = path.join(__dirname, 'routes')
fs.readdirSync(routesPath).map((c) =>
    app.use('/api', require(path.join(routesPath, c)))
)

// รันในเครื่อง: เปิด port 5001 / บน Vercel: ไม่ต้อง listen
if (require.main === module) {
    const PORT = process.env.PORT || 5001
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

module.exports = app