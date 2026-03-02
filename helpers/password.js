const bcrypt = require('bcryptjs')

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPas = bcrypt.hashSync(password, salt)
    return hashedPas
}

const compare = (password, hashedPassword) => {
    const isMatch = bcrypt.compareSync(password, hashedPassword)
    return isMatch
}

module.exports = { hash, compare}