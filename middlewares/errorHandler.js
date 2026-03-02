const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
    // Default error
    let message = err.message || err;
    let status = err.status || 500;

    // 1. Handle Mongoose Validation Error (Misal: field required kosong)
    if (err instanceof mongoose.Error.ValidationError) {
        let tempErr = [];
        for (let key in err.errors) {
            tempErr.push(err.errors[key].message);
        }
        message = tempErr;
        status = 400;
    } 
    
    // 2. Handle Mongoose Cast Error (Misal: ID di URL salah format/ngaco)
    else if (err instanceof mongoose.Error.CastError) {
        message = `Resource not found with id of ${err.value}`;
        status = 404;
    }

    // 3. Handle Error Manual yang dikirim lewat next({status, message})
    else if (err.status) {
        status = err.status;
        message = err.message;
    }

    // Tampilkan log di terminal untuk memudahkan kamu debugging
    console.error(`[ERROR] ${status} - ${Array.isArray(message) ? message.join(', ') : message}`);

    res.status(status).json({ 
        success: false,
        message 
    });
};

module.exports = errorHandler;