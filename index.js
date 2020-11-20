const express = require('express')
require('./connectdb/mongoose')
const renterRouter = require('./routers/renter')
const ownerRouter = require('./routers/owner')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(renterRouter)
app.use(ownerRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})