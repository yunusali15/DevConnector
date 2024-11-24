const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');


//@route GET api/auth
//@access Public
//@desc Test Route 
router.get('/', auth, //the slash is the default route when the api endpoint hits the resource 
async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password'); //searches the user in the database and returns the record without the password
        
        res.json(user); //returns the user in the json format
    } catch (err) {
        return res.status(401).json(); //401 is code for no authorisation for protected resources
    }
}); 

//@route POST api/auth
//@access Public
//@desc Login User
router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required ').exists() 
    ],
    async (req, res) => {//the slash is the default route when the api endpoint hits the resource
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { email, password } = req.body;

            let user = await User.findOne({ email });  //returns a promise

            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            
            const payload = {
                user: {
                    id: user.id             //the user id is automatically passed to any endpoint by passing in the jwt 
                }
            };

            jwt.sign(payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
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