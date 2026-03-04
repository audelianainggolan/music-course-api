const jwt = require('jsonwebtoken');
const secret = 'secret';

const generateToken = (payload) => {
    return jwt.sign(payload, secret);
}

const decodedToken = (token) => { 
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
    return decoded
}


module.exports = { generateToken, decodedToken };