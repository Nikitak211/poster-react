const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');

// require packege for the .env file
require('dotenv').config()

app.use(cors())

//Local imports
const AuthRoute = require('./routes/auth')

// MongoDBUri form env file goes here.
const mongoDBUri = process.env.MONGODB_URI

mongoose.connect(mongoDBUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.once('open', function () {
    console.log('connection is success!! ');
}).on('error', function (error) {
    console.log('***connection not available***', error);
});

const store = new MongoDBStore({
    uri: mongoDBUri,
    collection: process.env.DATABASE
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))

const isAuth = (req, res, next) => {
    try{
        if ( !req.session.authorization ) res.get('/')
        else next(); 
    }catch (error) {
        return res.send({status:true, message:'your session is not valid', data:error}) 
    }
}


app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/auth/', AuthRoute )

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
});

app.get('/',isAuth , (req, res) => {
    
})

const PORT = process.env.PORT || 7000
app.listen(PORT , () => {
    console.log("listening on port " + PORT)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
