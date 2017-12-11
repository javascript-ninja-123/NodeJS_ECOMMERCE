const router = require('express').Router();
const User = require('../models/user');



router.post('/signup', (req,res) => {
  const {firstName,lastName,password,email,address} = req.body;
  const user = new User({
    profile:{
      firstName,
      lastName
    },
    password,
    email,
    address
  });
  user.save()
  .then(doc => res.send(doc))
  .catch(err => res.status(400).send({err:err.message}))
})

module.exports = router;
