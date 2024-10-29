const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true,
    },
    name: { //adding so that the user can have the option to save his posts if he deletes account  
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        name: { //adding so that the user can have the option to save his posts if he deletes account  
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now(),
        } 
    }],
    date: {
        type: Date,
        default: Date.now(),
    } 
});

module.exports = Post = mongoose.model('posts', ProfileSchema);