const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Quizschema = new Schema({
  Title: String,
  description: String,
  created_by: {type: mongoose.Schema.ObjectId, ref: 'User'},
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  created_at : { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

});

const Quize = mongoose.model('Quize',Quizschema)

module.exports = Quize;