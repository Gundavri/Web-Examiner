const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');


module.exports.userTokenValid = (req, res, next) => {
    res.status(200).json({ message: 'Token is valid' });
}

module.exports.userLogin = (req, res, next) => {
    User.findOne({ $or: [{'username': req.body.username_email}, {'email': req.body.username_email} ]}).then(user => {
        if(!user) {
            return res.status(404).json({message: 'Invalid Login Parameters'});
        }
        bcrypt.compare(req.body.password, user.password, (err, same) => {
            if(err || !same) {
                return res.status(404).json({message: 'Invalid Login Parameters'})
            }
            const expiresIn = "3600";
            const token = jwt.sign(
                {
                    userId: user._id,
                    expiresIn
                }, process.env.JWT_SECRET, {
                    expiresIn
                }
            );
            res.status(200).json({
                message: 'Auth succesful',
                token: token,
                email: user.email
            });
        });
    }).catch(err => res.status(500).json({message: 'Database Error'}));
};

module.exports.userRegister = (req, res, next) => {
    if(!req.body.password || req.body.password.length < 6) return res.status(400).json({message: 'Invalid Password'});
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({message: 'Server Error'});
        } 
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created'
            });
        }).catch(err => {
            if(err.errmsg && err.errmsg.includes('duplicate')) return res.status(400).json({message: 'Username or Email is already taken'});
            else if(err.name === 'ValidationError') return res.status(500).json({message: err._message});
            console.log(err);
            res.status(500).json({message: 'Database Error'});
        });
    });
}