const express = require('express');
const router = express.Router();


//@route GET api/users
//@access Public
//@desc Test Route
router.get('/', (req, res)=> {res.send("User Route...")}); //the slash is the default route when the api endpoint hits the resource

module.exports = router;