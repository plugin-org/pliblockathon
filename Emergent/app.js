require('dotenv').config();

const express = require('express');
const login = require('./routes/Auth/login.js');
const register = require('./routes/Auth/register.js');
const verify = require('./routes/Auth/verify');
const resend = require('./routes/Auth/resendMail');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/login', login);
app.use('/register', register);
app.use('/verify', verify);
app.use('/resend', resend);

const MONGO_URI = process.env.URI;

mongoose.connect(
    MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('Connected to db!');
    }
);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
