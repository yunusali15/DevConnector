const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');
const config = require('config');


//@route GET api/posts/
//@access Private (User needs to login to see posts)
//@desc Get all posts
router.get('/', auth, async (req, res) => {

    try {

        const posts = await Post.find();

        if (!posts) {
            return res.status(404).send('No posts found!');
        }

        res.json(posts);
    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error');
    }
})


//@route GET api/posts/:id
//@access Private (User needs to login to see posts)
//@desc Gets post by id
router.get('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('No post found!');
        }

        res.json(post);

    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).send('No post found!');
        }
        res.status(500).json('Server Error');
    }
})


//@route DELETE api/posts/:id
//@access Private (User needs to login to see posts)
//@desc Delete a post
router.delete('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('No post found!');
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ 'msg': 'Unauthorised' });
        }

        await Post.findByIdAndRemove(req.params.id);
        res.json(post);

    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error');
    }
})


//@route POST api/posts/
//@access Private (User needs to login to see posts)
//@desc Create a post
router.post('/', auth,  //the slash is the default route when the api endpoint hits the resource
    [
        check('text', 'Text is required').not().isEmpty()
    ],
    async (req, res) => {
        try {

            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                avatar: user.avatar,
                name: user.name,
                user: req.user.id
            });

            const post = await newPost.save()

            res.json(post)

        } catch (err) {
            console.error(err.message)
            res.status(500).json('Server Error');
        }
    }
);

//@route POST api/posts/comment
//@access Private (User needs to login to see posts)
//@desc Create a Comment
router.post('/comment/:id', auth,
    [
        check('text', 'Text is required').not().isEmpty(),

    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ 'errors': errors.array() })
        }

        try {

            const post = await Post.findById(req.params.id);
            const user = await User.findById(req.user.id).select('-password');

            if (!post) {
                return res.status(400).send('Post not found');
            }

            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
            }

            post.comments.unshift(newComment);

            await post.save();

            res.json(post);

        } catch (err) {
            console.error(err.message)
            res.status(500).json('Server Error');
        }
    }
);

//@route DELETE api/posts/comment
//@access Private (User needs to login to see posts)
//@desc Delete a comment
router.delete('/comment/:post_id/:comment_id', auth,
    async (req, res) => {
        try {

            const post = await Post.findById(req.params.post_id);
            const user = await User.findById(req.user.id).select('-password');

            const comment = post.comments.find(comment => comment.id === req.params.comment_id);

            if (!comment) {
                return res.status(400).send('Comment not found');
            }

            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ 'msg': 'Unauthorised' });
            }

            const indexToRemove = post.comments.indexOf(comment);

            post.comments.splice(indexToRemove, 1);
            await post.save();

            res.json(post.comments);

        } catch (err) {
            console.error(err.message)
            res.status(500).json('Server Error');
        }
    }

);

//@route POST api/posts/comment
//@access Private (User needs to login to see posts)
//@desc Create a Comment
router.post('/like/:id', auth,
    async (req, res) => {
       
        try {

            const post = await Post.findById(req.params.id);
            const user = await User.findById(req.user.id).select('-password');

            if (!post) {
                return res.status(400).send('Post not found');
            }

            const newLike = {
                user: req.user.id
            }

            const like = post.likes.find(like => like.user.toString() === req.user.id);

            if (like) {
                return res.json({'msg':'Post already liked'});
            }

            post.likes.unshift(newLike);

            await post.save();

            res.json(post.likes);

        } catch (err) {
            console.error(err.message)
            res.status(500).json('Server Error');
        }
    }
);

//@route DELETE api/posts/comment
//@access Private (User needs to login to see posts)
//@desc Delete a comment
router.delete('/unlike/:post_id', auth,
    async (req, res) => {
        try {

            const post = await Post.findById(req.params.post_id);
            const user = await User.findById(req.user.id).select('-password');

            const like = post.likes.find(like => like.user.toString() === req.user.id);

            if (!like) {
                return res.json({'msg':'Post not liked'});
            }

            const indexToRemove = post.likes.indexOf(like);

            post.likes.splice(indexToRemove, 1);
            await post.save();

            res.json({'msg':'Unliked'});

        } catch (err) {
            console.error(err.message)
            res.status(500).json('Server Error');
        }
    }
);

module.exports = router;