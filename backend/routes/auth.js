const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req,res)=>{
  try{
    const {name,email,password} = req.body;
    if(!name||!email||!password) return res.status(400).json({msg:'missing'});
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({msg:'exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({name,email,password:hash});
    await user.save();
    res.json({msg:'ok'});
  }catch(e){ res.status(500).json({error:e.message})}
});

router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'no user'});
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({msg:'invalid'});
    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET || 'changeme', {expiresIn:'7d'});
    res.json({token, user:{name:user.name,email:user.email,role:user.role}});
  }catch(e){ res.status(500).json({error:e.message})}
});

module.exports = router;
