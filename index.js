const express = require('express')
require('./connectdb/mongoose')
const cors = require('cors')
const renterRouter = require('./routers/renter')
const ownerRouter = require('./routers/owner')
const adminRouter = require('./routers/admin')
const accomodRouter = require('./routers/accommodation')
const locationRouter = require('./routers/location')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(renterRouter)
app.use(ownerRouter)
app.use(adminRouter)
app.use(accomodRouter)
app.use(locationRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})