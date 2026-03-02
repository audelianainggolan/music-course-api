require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Koneksi Database
require('./configurations/mongoConnection');

// 1. Import Middleware Error Handler
const errorHandler = require('./middlewares/errorHandler');

const studentRoutes = require('./controllers/student'); 
const teacherRoutes = require('./controllers/teacher');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.get('/', (req, res) => {
  res.send('Music School API is Running!')
});

// 2. PASANG ERROR HANDLER DI SINI (Wajib di bawah semua route)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})