const express = require('express');
const router = express.Router();
const User = require('../models/users'); 

//Getting All Users
router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//Getting One User
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

//Creating User
router.post('/', async(req, res) => {
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        bio: req.body.bio
    });
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//Editing One User
router.patch('/:id', getUser, async(req, res) => {
    if(req.body.name){
        res.user.name = req.body.name;
    }
    if(req.body.bio){
        res.user.bio = req.body.bio;
    }
    try{
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Deleting One User
router.delete('/:id', getUser, async(req, res) => {
    try{
        await res.user.remove();
        res.json({message: 'Successfully deleted the user.'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Miiddleware
async function getUser(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        if(user === null){
            return res.status(404).json({message: 'Can not find user'});
        }
        res.user = user;
        next();
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = router;