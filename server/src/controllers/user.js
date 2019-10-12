const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
// const config = require('config');


const User = require('../models/User');


/**
 * @route       POST api/user
 * @description Register user
 * @access      Public => no need token
 */

exports.postUser = async (req, res) => { // async=> work in sync way
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        console.log('user', user)
        // See if user exists
        if (user) {
            console.log('user', user)
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }
        //avatar image if image not exixts
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        //save  into satabase
        user = new User({
            name,
            email,
            password
        })

        /**encrypt  password*/
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();  //return promise so we use await
        /*Return  jsonwebtoken*/
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 'mysecrettoken', { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                // if (err) {
                //     return console.error(err.message);
                // }
                res.json({ token });
            }
        );
        // res.send('User Registered');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

