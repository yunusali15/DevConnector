const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');


//@route GET api/users
//@access Public
//@desc Register User
router.post('/', [
    check('name', 'Name is required').not().isEmpty(), //second argument is when the validation checks fail
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Minimum password length is 6').isLength({ min: 6 })
],
    async (req, res) => {//the slash is the default route when the api endpoint hits the resource
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { name, email, password } = req.body;

            let user = await User.findOne({ email });  //returns a promise

            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists!" }] });
            }

            const avatar = gravatar.url(email, { //connects to the gravatar to get avatar
                s: '200', //size
                r: 'pg', //only pg rated
                d: 'mm', //if no avatar found then default picture is used
            });

            user = new User({ //creates a new user instance but not saved in db until the user.save() is called
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save(); //saves to the database

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, 
                config.get('jwtSecret'),
                //{ expiresIn: 360000 }, commenting for testing purposes
                (err, token) => {
                    if(err) throw err
                    res.json({token});
                }
            )

            console.log(req.body);
        } catch (err) {
            return res.status(500).send('Server Error');
        }
    });


module.exports = router;