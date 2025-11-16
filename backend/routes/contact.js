const express = require('express');
const router = express.Router();
router.post('/', (req,res)=> {
  console.log('contact form', req.body);
  res.json({msg:'received'});
});
module.exports = router;
