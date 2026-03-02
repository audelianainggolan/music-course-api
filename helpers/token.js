const jwt = require('jsonwebtoken');
const secret = 'secret';

const generateToken = (payload) => {
    return jwt.sign(payload, secret);
}

// Ekspor sebagai OBJEK agar konsisten dengan helper password
module.exports = { generateToken };