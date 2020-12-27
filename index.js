const express = require('express')
require('./connectdb/mongoose')
const cors = require('cors')
const renterRouter = require('./routers/renter')
const ownerRouter = require('./routers/owner')
const adminRouter = require('./routers/admin')
const accomodRouter = require('./routers/accommodation')
const locationRouter = require('./routers/location')
const followRouter = require('./routers/follow')
const commentRouter = require('./routers/comment.model')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(renterRouter)
app.use(ownerRouter)
app.use(adminRouter)
app.use(accomodRouter)
app.use(locationRouter)
app.use(followRouter)

app.use('/comment', commentRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
