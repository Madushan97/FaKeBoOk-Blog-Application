const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userSchema = new Schema({

    username: { type: String, requires: true, min: 4, unique: true },
    password: { type: String, requires: true }
})

const UserModel = model('User', userSchema)

module.exports = UserModel;