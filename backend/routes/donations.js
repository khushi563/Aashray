const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Project = require('../models/Project'); 

router.post('/', async (req, res) => {
  try {
    
    const { name, email, amount, projectId } = req.body;
    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: "Invalid donation amount" });
    }

    const d = new Donation({
      name,
      email,
      amount: numAmount,
      project: projectId || null 
    });
    await d.save();

    
    if (projectId) {
      await Project.findByIdAndUpdate(projectId, {
        $inc: { raised: numAmount } 
      });
    }

    res.status(201).json({ msg: 'thanks', donation: d });

  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ error: "Server error while saving donation" });
  }
});

router.get('/', async (req, res) => {
  try {
    
    const all = await Donation.find()
      .populate('project', 'title') 
      .sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;