const mongoose = require('mongoose'); 
//mongoose is used to create the schema and the model that will connected to the database to store users  

//analogous to the JEE entity classes and te validation constraints
const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    date: {
        type: Date,
        default: Date.now,
    },

    //for gravatar to be added rigt after the register process
    avatar: {
        type: String,

    }
});

//the model is exported to create the new entities using the userSchema
module.exports = User = mongoose.model('user', userSchema);