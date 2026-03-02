require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Koneksi Database
require('./configurations/mongoConnection');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./controllers/auth');
const studentRoutes = require('./controllers/student');
const teacherRoutes = require('./controllers/teacher');

// Pasang Routes
app.use('/', authRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.get('/', (req, res) => res.send('API is running...'));

// ERROR HANDLER (WAJIB PALING BAWAH SETELAH SEMUA ROUTES)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});