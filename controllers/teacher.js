const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// CREATE
router.post('/', (req, res, next) => { // Tambahkan 'next'
    const { name, specialization, workingDay, workingTime } = req.body;
    Teacher.create({ name, specialization, workingDay, workingTime })
    .then((teacher) => {
        res.status(201).json({
            message: "Teacher data created successfully!",
            data: teacher
        });
    })
    .catch(next); // Dilempar ke Global Error Handler
});

// READ ALL
router.get('/', (req, res, next) => {
    Teacher.find()
    .then((teachers) => res.status(200).json(teachers))
    .catch(next);
});

// READ BY ID
router.get('/:id', (req, res, next) => {
    Teacher.findById(req.params.id)
    .then((teacher) => {
        if (!teacher) {
            // Menggunakan pola manual error agar ditangkap middleware
            return next({ status: 404, message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    })
    .catch(next);
});

// UPDATE
router.put('/:id', (req, res, next) => {
    const { name, specialization, workingDay, workingTime } = req.body;
    Teacher.findByIdAndUpdate(
        req.params.id, 
        { name, specialization, workingDay, workingTime }, 
        { new: true, runValidators: true }
    )
    .then((teacher) => {
        if (!teacher) {
            return next({ status: 404, message: "Teacher not found" });
        }
        res.status(200).json({
            message: "Teacher data updated successfully!",
            data: teacher
        });
    })
    .catch(next);
});

// DELETE
router.delete('/:id', (req, res, next) => {
    Teacher.findByIdAndDelete(req.params.id)
    .then((teacher) => {
        if (!teacher) {
            return next({ status: 404, message: "Teacher not found" });
        }
        res.status(200).json({ message: "Teacher data deleted successfully" });
    })
    .catch(next);
});

module.exports = router;