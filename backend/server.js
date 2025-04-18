
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mananaBookings', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  date: String,
  time: String
});

const Booking = mongoose.model('Booking', BookingSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matshwisamanana156@gmail.com',
    pass: 'Reatlaretse9607' // Use an app password or secure method here
  }
});

app.post('/api/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    await transporter.sendMail({
      from: '"Manana Spa Booking" <matshwisamanana156@gmail.com>',
      to: 'matshwisamanana156@gmail.com',
      subject: 'New Booking Received',
      text: `Booking details:
Name: ${req.body.name}
Email: ${req.body.email}
Service: ${req.body.service}
Date: ${req.body.date}
Time: ${req.body.time}`
    });

    res.status(200).send({ message: 'Booking successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Booking failed' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
