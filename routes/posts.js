const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// get all posts
router.get('/', async (req, res) => {
    try { 
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message:err});
    }
});

// create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
    
});

// return selected post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }catch (err) {
        res.json({message:err});
    }
});

// update a post description
router.patch(':id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({id: req.params.id}, 
            {$set: {title: req.params.title}});
        res.json(updatedPost);
    } catch (err) {
        res.json({message:err});
    }
});

// delete a post
router.delete('/:id', async (req,res) => {
    try {
        const deletedPost = await Post.remove({_id: req.params.id});
        res.json(deletedPost);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;