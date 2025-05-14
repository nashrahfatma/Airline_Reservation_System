const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    departureCity:
    {
        type: String,
        required: true
    },
    arrivalCity:
    {
        type: String,
        required: true
    },
    departureDate:
    {
        type: Date,
        required: true
    },
    returnDate:
    {
        type: Date

    },
    tripType:
    {
        type: String,
        enum: ['one-way', 'round-trip'],
        required: true
    },
    travelClass:
    {
        type: String,
        enum: ['economy', 'business', 'first'],
        required: true
    },

    fullName:
    {
        type: String,
        required: true
    },
    gender:
    {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    dob:
    {
        type: Date,
        required: true
    },
    phone:
    {
        type: String,
        required: true
    },
    nationality:
    {
        type: String,
        required: true
    },
    passportNumber:
    {
        type: String,
        required: true
    },
    passportExpiry:
    {
        type: Date,
        required: true
    },

    createdAt:
        { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);   
module.exports = Booking; 
