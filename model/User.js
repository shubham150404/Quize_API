const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Username: String,
  Email: { unique :true ,type: String  },
  password: String,
  Userdate:{ type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User',UserSchema)

module.exports =User;