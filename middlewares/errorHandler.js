const mongoose = require('mongoose')

const errorHandler = (err, req, res, next) => {
    // Ambil string pesannya, jangan objek utuhnya
    let message = err.message || "Internal Server Error" 
    let status = err.status || 500

    if (err instanceof mongoose.Error.ValidationError) {
        let tempErr = []
        for (let key in err.errors) {
            tempErr.push(err.errors[key].message)
        }
        message = tempErr
        status = 400
    }
    
    // Log ini sangat penting untuk debug di terminal VS Code kamu
    console.error("LOG ERROR:", err);

    res.status(status).json({ message })
}

module.exports = errorHandler