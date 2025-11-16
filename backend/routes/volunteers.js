const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.post('/', async (req,res)=> { const v=new Volunteer(req.body); await v.save(); res.json({msg:'registered', v}); });
router.get('/', async (req,res)=> res.json(await Volunteer.find().sort({createdAt:-1})));

module.exports = router;
