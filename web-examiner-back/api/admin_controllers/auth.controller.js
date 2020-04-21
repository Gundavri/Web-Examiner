const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');


module.exports.adminTokenValid = (req, res, next) => {
    res.status(200).json({ message: 'Token is valid'});
}

module.exports.adminLogin = (req, res, next) => {
    Admin.findOne({email: req.body.email}).then(admin => {
        if(!admin) {
            return res.status(404).json({message: 'Invalid Login Parameters'});
        }
        bcrypt.compare(req.body.password, admin.password, (err, same) => {
            if(err || !same) {
                return res.status(404).json({message: 'Invalid Login Parameters'})
            }
            const expiresIn = "3600";
            const token = jwt.sign(
                {
                    adminId: admin._id,
                    expiresIn
                }, process.env.JWT_SECRET_ADMIN,
                {
                    expiresIn
                }
            );
            res.status(200).json({
                message: 'Auth succesful',
                token: token,
                email: admin.email
            });
        });
    }).catch(err => res.status(500).json({message: 'Database Error'}));
};