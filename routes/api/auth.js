const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');


//@route GET api/posts
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

module.exports = router;