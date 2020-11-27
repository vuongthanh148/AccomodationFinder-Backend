const express = require('express')
require('./connectdb/mongoose')
const cors = require('cors')
const renterRouter = require('./routers/renter')
const ownerRouter = require('./routers/owner')
const adminRouter = require('./routers/admin')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(renterRouter)
app.use(ownerRouter)
app.use(adminRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})