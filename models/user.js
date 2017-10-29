const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        email: {
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
            type: Number,
            required: true
        },
        carbohydrateRatio: {
            type: Number,
            required: true
        },
        correctionRatio: {
            type: Number,
            required: true
        },
        targetBloodSugar: {
            type: Number,
            required: true
        },
        insulinOnBoardDuration: {
            type: Number,
            required: true
        }
    }
);

function toLower(str) {
    return str.toLowerCase();
}

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.addUser = (newUser, callback) => {
    newUser.save(callback);
};

module.exports.login = (credentials, callback) => {
    const QUERY = {
        username: credentials.username,
        password: credentials.password
    };

    User.findOne(QUERY, callback);
};

module.exports.getUserById = (_id, callback) => {
    User.findById(_id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    const QUERY = {
        username: username
    };

    User.findOne(QUERY, callback);
};
