const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./User.js'); 


console.log(User);

const register = async (req, res) => {
    const { username } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send({ error: 'username already exists'});
        const hashedPassword = bcrypt.hashSync(req.body.password, 10); //hash password
        const user = new User({ //need to make sure req.body has data, double check this later
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            student: req.body.student,
            age: req.body.age,
            favoriteTeam: req.body.favoriteTeam,
            favoritePlayer: req.body.favoritePlayer
        });
        user.save();
        console.log("User Registered");
        res.status(201).send("User registered"); //sends status 201 to frontend
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering new user'); //sends status 500 to frontent
    }
}

//login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found while trying to login in');
            return res.status(401).send({ error: 'Invalid username or password' });
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).send({ error: 'Invalid username or password' });
        }
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'yourJWTSecret', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).send({ error: 'Internal Server Error: ' + error.message })
    }
};


//logout
const logout = (req,res) => {
    req.logout();
    console.log('Logout sucessful');
     // Clear the token (for token-based authentication)
    // For example, if using JWT, you might remove the token from local storage or clear the cookie
    // Here's an example assuming you're using JWT and storing the token in local storage:
    localStorage.removeItem('token');
    res.redirect('/login');
}

// Arrow function to check session
const sessionCheck = (req, res) => {
    console.log(req.session);
    console.log(req.user);
    console.log('Is authenticated:', req.isAuthenticated());
    res.send('Check your server logs for session details and user info')
}

module.exports = {
    register,
    login,
    logout,
    sessionCheck
};