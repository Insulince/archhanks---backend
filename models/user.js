const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    email:{
        type: String,
        set: toLower,
        required: true
    },
    username: {
        type: String,
        set: toLower,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    basalRate: {
        type: Number
    },
    carbRatio: {
        type: Number
    },
    correctionRatio: {
        type: Number
    },
    IOBDuration: {
        type: Number
    }
});

function toLower(str) {
    return str.toLowerCase();
}

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (_id, callback) {
    User.findById(_id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};