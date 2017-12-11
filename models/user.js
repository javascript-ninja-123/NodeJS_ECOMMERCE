const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//The user schem attributes / charatersitics / fields
const userSchema = new Schema({
  email: {
    type:String,
    unique:true,
    lowercase:true,
    required:true
  },
  password:{type:String, required:true},
  profile:{
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    picture:{type:String, default:''}
  },
  address:String,
  history:[{
    date:Date,
    paid:{type:Number, default:0},
  }]
})

// Hash the password before we even save it to the database
userSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash;
    next();
  })
  .catch(err => next(err));
})


//compare password in the database and the one that use type in
userSchema.methods.comparePassword = password => {
  return bcrypt.compareSync(password,this.password);
}




module.exports = mongoose.model('User',userSchema)
