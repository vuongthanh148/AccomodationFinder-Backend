const express = require('express')
require('./connectdb/mongoose')
const renterRouter = require('./routers/renter')
const ownerRouter = require('./routers/owner')
const adminRouter = require('./routers/admin')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(renterRouter)
app.use(ownerRouter)
app.use(adminRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// var firebase = require('firebase');
// var firebaseConfig = {
//     apiKey: "AIzaSyBML5XXQ9h_5SkY8CWSDTg9Ie28ar5dMo8",
//     authDomain: "temporal-sweep-237417.firebaseapp.com",
//     databaseURL: "https://temporal-sweep-237417.firebaseio.com",
//     projectId: "temporal-sweep-237417",
//     storageBucket: "temporal-sweep-237417.appspot.com",
//     messagingSenderId: "20607903724",
//     appId: "1:20607903724:web:09a8cd91db8686eed102c9",
//     measurementId: "G-8SGL3W0MBH"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// import firebase from 'firebase/app';
 
// // These imports load individual services into the firebase namespace.
// import 'firebase/auth';
// import 'firebase/database';