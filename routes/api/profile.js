const express = require('express');
const router = express.Router();


//@route GET api/profiles
//@access Public
//@desc Test Route
router.get('/', (req, res)=> {res.send("Profile Route...")}); //the slash is the default route when the api endpoint hits the resource

module.exports = router;