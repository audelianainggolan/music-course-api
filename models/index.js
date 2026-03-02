const Student = require('./student');
const Teacher = require('./teacher');

module.exports = {
    Student,
    Teacher
};

//kalo mau export banyak model, bisa pake cara ini, 
// kalo cuma satu model, bisa langsung export modelnya aja di file model itu sendiri, ga perlu buat index.js lagi.