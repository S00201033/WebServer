//const mongodb = require('mongodb');


const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const players = require('./routes/players');
const home = require('./routes/home');


const app = express();
const port = 3000;

// configure the middleware for parsing HTML requeest body

const connectionString = 'mongodb://127.0.0.1:27017/Players'


mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});



app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(cors());


app.use('/players', players);

app.use('/', home);






app.listen(port, () => console.log(`Example app listening on port ${port}!`))