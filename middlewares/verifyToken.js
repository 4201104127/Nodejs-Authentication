const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const token = request.header('auth-token');
    const TOKEN_SECRET="random";
    if (!token) return response.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        next();
    } catch (err) {
        return response.status(400).send('Invalid Token');
    }
};