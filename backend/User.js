const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    student: Boolean,
    age: Number,
    favoriteTeam: String,
    favoritePlayer: String
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
