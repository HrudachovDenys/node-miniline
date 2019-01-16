const jwt = require('jsonwebtoken');
const config = require('../config');

class JsonWebToken {
    generateToken(user) {
        return jwt.sign(user, config.get('token:secret'), { expiresIn: 60*60*24*7 });
    }

    verificationToken(token) {
        jwt.verify(token, config.get('token:secret'), (err) => {
            if(err) {
                return false;
            } else {
                return true;
            }
        });
    }
}

module.exports = new JsonWebToken();