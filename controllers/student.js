const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// CREATE
router.post('/', (req, res) => {
    const { name, course, day, time, teacherId } = req.body;
    Student.create({ name, course, day, time, teacherId })
    .then((student) => {
        res.status(201).json({
            message: "Student data created successfully!",
            data: student
        });
    })
    .catch((err) => res.status(400).json({ message: "Failed to create student data", error: err.message }));
});

// READ ALL
router.get('/', (req, res) => {
    Student.find()
    .populate('teacherId')
    .then((students) => res.status(200).json(students))
    .catch((err) => res.status(500).json({ message: "Failed to fetch students", error: err.message }));
});

// READ BY ID
router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
    .populate('teacherId')
    .then((student) => {
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    })
    .catch((err) => res.status(400).json({ message: "Invalid ID format", error: err.message }));
});

// UPDATE
router.put('/:id', (req, res) => {
    const { name, course, day, time, teacherId } = req.body;
    Student.findByIdAndUpdate(
        req.params.id, 
        { name, course, day, time, teacherId }, 
        { new: true, runValidators: true }
    )
    .populate('teacherId')
    .then((student) => {
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({
            message: "Student data updated successfully!",
            data: student
        });
    })
    .catch((err) => res.status(400).json({ message: "Update failed", error: err.message }));
});

// DELETE
router.delete('/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id)
    .then((student) => {
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student data deleted successfully" });
    })
    .catch((err) => res.status(500).json({ message: "Delete failed", error: err.message }));
});

module.exports = router;