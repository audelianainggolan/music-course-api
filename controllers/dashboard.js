const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const Student = require('../models/student');

// GET: Admin Dashboard Summary (Teachers & Students Only)
router.get('/summary', (req, res, next) => {
    // Menjalankan query Teacher dan Student secara bersamaan
    Promise.all([
        Teacher.find(),           // Mengambil semua data guru
        Student.find(),           // Mengambil semua data murid
        Teacher.countDocuments(), // Menghitung total guru
        Student.countDocuments()  // Menghitung total murid
    ])
    .then(([teachers, students, teacherCount, studentCount]) => {
        res.status(200).json({
            success: true,
            message: "Admin Dashboard Data",
            statistics: {
                totalTeachers: teacherCount,
                totalStudents: studentCount
            },
            data: {
                allTeachers: teachers,
                allStudents: students
            }
        });
    })
    .catch(next);
});

module.exports = router;