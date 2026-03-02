require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('./configurations/mongoConnection');

const studentRoutes = require('./controllers/student'); 
const teacherRoutes = require('./controllers/teacher');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.get('/', (req, res) => {
  res.send('Music School API is Running!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})