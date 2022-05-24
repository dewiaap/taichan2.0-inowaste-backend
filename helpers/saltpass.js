const bcrypt = require('bcrypt');
const saltRounds = 10;

const SaltPass = (pass) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, saltRounds, (err, hash) => {
            if (err) {
                resolve(false)
            }
            resolve(hash)
        });
    })
}

module.exports = {
    SaltPass
}