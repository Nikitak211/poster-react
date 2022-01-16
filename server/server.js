const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');

// require packege for the .env file
require('dotenv').config()

app.use(cors())

//Local imports
const AuthRoute = require('./routes/auth')
const topSecret = require('./routes/authed')

// MongoDBUri form env file goes here.
const mongoDBUri = process.env.MONGODB_URI

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine 
app.set("view engine", "ejs");

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
    try {
        if (!req.session.authorization) res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
        else next();
    } catch (error) {
        return res.send({ status: true, message: 'your session is not valid', data: error })
    }
}

app.get('/', isAuth, (req, res) => {

    res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
})


app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/auth/', AuthRoute)
app.use('/api/auth/', topSecret)

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
});

const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

