const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StudentSchema = new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    course: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;