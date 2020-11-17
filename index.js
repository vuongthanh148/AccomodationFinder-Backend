const express = require('express')
require('./connectdb/mongoose')
const renterRouter = require('./routers/renter')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(renterRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const Renter = require('./models/renterModel')

// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const renter = await Renter.findById('5c2e4dcb5eac678a23725b5b')
//     await renter.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()