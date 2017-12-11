const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const publicPath = path.join(__dirname,'../client/build');

//schema model
const User = require('./models/user');

//database setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tjdalsvndn9:cj7600tu@ds137206.mlab.com:37206/commerce',{ useMongoClient: true });

app.use(express.static(publicPath))
//console.log() all http log
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/create-user', (req,res) => {
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


app.listen(PORT, (err) => {
  if(err) {
    console.log('err occured')
  }
  else{
    console.log(`Listening to ${PORT}`)
  }
})
