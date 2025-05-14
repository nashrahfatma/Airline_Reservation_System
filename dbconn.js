const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://localhost:27017/vayuPro').then(() => {
    console.log('MongoDB connected successfully');
})
module.exports = conn;