const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// CREATE
router.post('/', (req, res) => {
    const { name, specialization, workingDay, workingTime } = req.body;
    Teacher.create({ name, specialization, workingDay, workingTime })
    .then((teacher) => {
        res.status(201).json({
            message: "Teacher data created successfully!",
            data: teacher
        });
    })
    .catch((err) => res.status(400).json({ message: "Failed to create teacher data", error: err.message }));
});

// READ ALL
router.get('/', (req, res) => {
    Teacher.find()
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(500).json({ message: "Failed to fetch teachers", error: err.message }));
});

// READ BY ID
router.get('/:id', (req, res) => {
    Teacher.findById(req.params.id)
    .then((teacher) => {
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.status(200).json(teacher);
    })
    .catch((err) => res.status(400).json({ message: "Invalid ID format", error: err.message }));
});

// UPDATE
router.put('/:id', (req, res) => {
    const { name, specialization, workingDay, workingTime } = req.body;
    Teacher.findByIdAndUpdate(
        req.params.id, 
        { name, specialization, workingDay, workingTime }, 
        { new: true, runValidators: true }
    )
    .then((teacher) => {
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.status(200).json({
            message: "Teacher data updated successfully!",
            data: teacher
        });
    })
    .catch((err) => res.status(400).json({ message: "Update failed", error: err.message }));
});

// DELETE
router.delete('/:id', (req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
    .then((teacher) => {
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.status(200).json({ message: "Teacher data deleted successfully" });
    })
    .catch((err) => res.status(500).json({ message: "Delete failed", error: err.message }));
});

module.exports = router;