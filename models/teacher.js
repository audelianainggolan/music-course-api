const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeacherSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    workingDay: { type: String, required: true },
    workingTime: { type: String, required: true }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;