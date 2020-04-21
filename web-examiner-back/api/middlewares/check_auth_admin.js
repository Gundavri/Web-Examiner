const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(!req.headers.authorization || !req.headers.authorization.includes(' ')) {
        return res.status(401).json({message: 'Auth failed'});
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
        if(err || Date.now()/1000 - decoded.iat > Number(decoded.expiresIn)) return res.status(401).json({message: 'Auth failed'});
        req.adminData = decoded;
        next();
    });
};