const mongoose = require('mongoose');   

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const userSchema = mongoose.model('User', schema);
module.exports = userSchema;