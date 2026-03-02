const Student = require('./student');
const Teacher = require('./teacher');
const User = require('./user');

module.exports = {
    Student,
    Teacher,
    User
};

//kalo mau export banyak model, bisa pake cara ini, 
// kalo cuma satu model, bisa langsung export modelnya aja di file model itu sendiri, ga perlu buat index.js lagi.