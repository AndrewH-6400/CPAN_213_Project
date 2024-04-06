const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    student: Boolean,
    age: Number,
    favoriteTeam: String,
    favoritePlayer: String
});

module.exports = mongoose.model('User', userSchema, 'users');
