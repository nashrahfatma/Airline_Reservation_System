const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const UserSchema = require('./dbschema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbconn = require('./dbconn/dbconn');
const BookingSchema = require('./dbschema/bookingSchema');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const API_KEY = '48b62e52da67feb7776437d181e6e11f';

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('first');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/register', async (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, email, password, address, mobileNo } = req.body;
  try {
    if (!username || !email || !password || !address || !mobileNo) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters." });
    }

    const userCheck = await UserSchema.findOne({ email });
    if (userCheck) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserSchema({
      username,
      email,
      password: hashPassword,
      address,
      mobileNo,
    });

    res.render('home');
    await newUser.save();
    // generateToken(newUser._id, res);

    return res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      address: newUser.address,
      mobileNo: newUser.mobileNo,
    });
  } catch (error) {
    console.log('Error in sign up:', error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.get('/login', async (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = await UserSchema.findOne({ email });

    if (!userFind) {
      return res.status(400).json({ message: "User not found , Email will be incorrect.." });
    }

    const isPasswordCorr = await bcrypt.compare(password, userFind.password);
    if (!isPasswordCorr) {
      return res.status(400).json({ message: "User not found , Password will be incorrect.." });
    }

    res.render('home');
    await userFind.save();

    // generateToken(userFind._id, res);

    return res.status(200).json({
      _id: userFind._id,
      username: userFind.username,
      email: userFind.email,
      address: userFind.address,
    });
  } catch (error) {
    console.log('error in login..', error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.get('/tcktbooking', async (req, res) => {
  res.render('tcktBook');
});

app.post('/tcktbooking', async (req, res) => {
  const { departureCity, arrivalCity, departureDate, returnDate, tripType, travelClass, fullName, gender, dob, phone, nationality, passportNumber, passportExpiry, createdAt } = req.body;
  try {
    if (!departureCity || !arrivalCity || !departureDate || !tripType || !travelClass || !fullName || !phone || !passportNumber || !passportExpiry) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (tripType === 'round-trip' && !returnDate) {
      return res.status(400).json({ message: "Return date is required for round-trip." });
    }

    const booking = new BookingSchema({
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      tripType,
      travelClass,
      fullName,
      gender,
      dob,
      phone,
      nationality,
      passportNumber,
      passportExpiry,
      createdAt
    });
    // res.render('home');
    await booking.save();
    return res.status(200).json({
      'User booked his ticket successfully': {
        departureCity,
        arrivalCity,
        departureDate,
        returnDate,
        tripType,
        travelClass,
        fullName,
      }
    });

  }

  catch (error) {
    console.log('Error in booking:', error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }

});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});