const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./db');
require('./passport/local-auth');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
const SECRET_SESSION = process.env.SESSION || 'mysecretsession';
const chargeData = require("./helpers/createdata");

//settings
app.set('port', process.env.PORT || PORT);

//middlewares
app.use(cors({
    origin: ORIGIN,
    credentials: true,
    methods: true,
}));
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// chargeData()

// mostrar el mensaje de validacion
app.use((req, res, next) => {
    // app.locals.signinMessage = req.flash('signinMessage');
    // app.locals.signupMessage = req.flash('signupMessage');

    app.locals.user = req.user;
    const a = app.locals.user
    const username = a?.username;
    console.log('app-local  ', username)
    next();
});

//route
app.use('/api', require('./routes/routes'));


app.use((req, res, next) => {
    res.status(404).send('Lo siento, no puedo encontrar eso!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
// start server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});