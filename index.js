require('dotenv').config();

const express = require('express');
const port = process.env.PORT || 3000;
const passport = require('passport'); 
require('./helpers/passport'); // Memastikan config passport dijalankan

const app = express();

// Koneksi Database
require('./configurations/mongoConnection');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// IMPORT CENTRAL ROUTER
// Ini akan mengambil semua rute dari folder /routes
const router = require('./routes'); 
app.use(router);

// Default Route
app.get('/', (req, res) => res.send('Music Courses API is running...'));

// ERROR HANDLER
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});