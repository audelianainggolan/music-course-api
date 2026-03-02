const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// CREATE
router.post('/', (req, res, next) => { // Tambahkan 'next' di sini
    const { name, course, day, time, teacherId } = req.body;
    Student.create({ name, course, day, time, teacherId })
    .then((student) => {
        res.status(201).json({
            message: "Student data created successfully!",
            data: student
        });
    })
    .catch(next); // Otomatis ditangkap Global Error Handler (Validation Error dsb)
});

// READ ALL
router.get('/', (req, res, next) => {
    Student.find()
    .populate('teacherId')
    .then((students) => res.status(200).json(students))
    .catch(next);
});

// READ BY ID
router.get('/:id', (req, res, next) => {
    Student.findById(req.params.id)
    .populate('teacherId')
    .then((student) => {
        // Jika student tidak ditemukan, lempar error object ke middleware
        if (!student) {
            return next({ status: 404, message: "Student not found" });
        }
        res.status(200).json(student);
    })
    .catch(next); // Menangkap CastError jika format ID salah
});

// UPDATE
router.put('/:id', (req, res, next) => {
    const { name, course, day, time, teacherId } = req.body;
    Student.findByIdAndUpdate(
        req.params.id, 
        { name, course, day, time, teacherId }, 
        { new: true, runValidators: true } // runValidators penting agar ValidationError terpicu
    )
    .populate('teacherId')
    .then((student) => {
        if (!student) {
            return next({ status: 404, message: "Student not found" });
        }
        res.status(200).json({
            message: "Student data updated successfully!",
            data: student
        });
    })
    .catch(next);
});

// DELETE
router.delete('/:id', (req, res, next) => {
    Student.findByIdAndDelete(req.params.id)
    .then((student) => {
        if (!student) {
            return next({ status: 404, message: "Student not found" });
        }
        res.status(200).json({ message: "Student data deleted successfully" });
    })
    .catch(next);
});

module.exports = router;