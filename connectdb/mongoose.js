const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/accommodationFinder', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })

mongoose.connect('mongodb+srv://vuongthanh148:vuongthanh148@cluster0.rtzxc.mongodb.net/accommodationFinder?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})