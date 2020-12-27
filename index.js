const express = require('express')
require('./connectdb/mongoose')
const cors = require('cors')
const renterRouter = require('./routers/renter')
const ownerRouter = require('./routers/owner')
const adminRouter = require('./routers/admin')
const accomodRouter = require('./routers/accommodation')
const locationRouter = require('./routers/location')
const followRouter = require('./routers/follow')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "POST");
    next();
  });
  
app.use(renterRouter)
app.use(ownerRouter)
app.use(adminRouter)
app.use(accomodRouter)
app.use(locationRouter)
app.use(followRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})