const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const publicPath = path.join(__dirname,'../client/build');



//database setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tjdalsvndn9:cj7600tu@ds137206.mlab.com:37206/commerce',{ useMongoClient: true });

app.use(express.static(publicPath))
//console.log() all http log
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//router
const userRoute = require('./routes/user');
app.use(userRoute);


app.listen(PORT, (err) => {
  if(err) {
    console.log('err occured')
  }
  else{
    console.log(`Listening to ${PORT}`)
  }
})
