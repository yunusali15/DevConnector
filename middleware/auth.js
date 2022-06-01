const jwt = require('jsonwebtoken');
const express = require('express');
const { model } = require('mongoose');
const config = require('config');

module.exports = async function(req, res, next) {

    try {
        const token = req.header('x-auth-token'); //grabs the token from the header of request 

        if(!token) {
            return res.status(401).json({ msg: 'No Token Provided'});
        }
        const decoded = await  jwt.verify(token, config.get('jwtSecret')); //gets decoded string from jwt 
        
        req.user = decoded.user; //selects the user object from the decoded object
        next(); //allows the req to move forward to the protected resource

    } catch (err) {
        return res.status(401).json({ msg: 'Invalid Token Provided'});
    }
}