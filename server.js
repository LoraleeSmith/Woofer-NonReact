require('dotenv').config();
const express = require("express");
mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Park = require('./models/park'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// ROUTES
const indexRoutes = require('./routes/index'),
    parkRoutes = require('./routes/parks'),
    commentRoutes = require('./routes/comments');

// DATABASE
mongoose.connect('mongodb://localhost:27017/park_app' || process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

seedDB();

// MOMENT
app.locals.moment = require('moment');

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// SERVER
app.use('/', indexRoutes);
app.use('/parks', parkRoutes);
app.use('/parks/:id/comments', commentRoutes);

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.listen(process.env.PORT, function () {
    console.log('Server listening on PORT ' + process.env.PORT + '.');
});