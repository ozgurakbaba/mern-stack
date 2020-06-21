// dotnev (hide constant connection values)
require('dotenv/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors');
// import routes (middleware)
const postsRoute = require('./routes/posts');

try {
    // call (use) middleware
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/posts', postsRoute);
    
    // routes
    app.get('/', (req, res) => {
        res.send('home');
    });

    // connect to mongodb
    mongoose.connect(process.env.db_connection, {useUnifiedTopology: true, useNewUrlParser: true}, () => console.log('connected to the database'));
    
    // listen port
    app.listen(3000);

} catch (e) {
    console.error(e);
}