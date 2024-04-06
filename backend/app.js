const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const authRoutes = require('./AuthRoutes');
const bcrypt = require('bcryptjs');


// const AuthController = require('./AuthController');

const app = express();
const PORT = 8000;


//middleware for cors, bodyParserm, sessions
app.use(cors({origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
//initialize passport and sessions 
app.use(passport.initialize());
app.use(passport.session());  

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/nba_game_tracker'); //127.0.0.1 this points back to local machine address


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('Connected to the database');
});


const User = require('./User.js'); 

//Passport configuration 
passport.use(new LocalStrategy(
    async (username, password, done) => {
        console.log('In local strategy', username);
    try {
        //Attempt to find the user by their username
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false); //If user not found, return false
        }


        //If user is found, compare the provided password with the hashed password in database
        if(await bcrypt.compare(password, user.password)) {
            return done(null, user); //if password matches authenticate the user
        }else {
            return done(null, false); // if passwords doesnt match return false
        }
    } catch (err) {
        done(err);
    }    
    }
));

//serialization decide which data of user obj should be store in the session
//storying only the user id
passport.serializeUser((user, done) => {
    console.log("ID in serialize: ", user )
    done(null, user.id);//storing user id
});


passport.deserializeUser(async (id, done) => {
 console.log("ID in deserialize: ", id);
    try{
        const user = await User.findById(id);
        done(null, user); // the user obj is attached to the req object as req.user
    } catch (err) {
        done(err, null)
    }

});

// mounting aurthRoutes functions to endpoint auth
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server is running on port -> ${PORT}`));