const { decodedToken } = require('../helpers/token');

const authentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied: Please login'});
        }
        const token = authHeader.split(' ')[1]; // Mengambil token dari header "

        const decoded = decodedToken(token);

        req.user = decoded; // Menyimpan data user yang sudah didecode ke req.user
        next();
    } 
    catch (err) {
        res.status(401).json({ message: 'Access denied: Please login again' });
    }
}

module.exports = {authentication};