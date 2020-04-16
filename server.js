const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Used Knex to connect to our database
const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-horizontal-15127',
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ROUTES* put the functions in a seperate folder "controllers" for cleaner code
app.get('/', (req, res) => { res.send("It is working!") })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})
