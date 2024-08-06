const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const optionschema = new Schema({
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    optionText: { type: String, required: true },
    isCorrect:  { type: Boolean, default: false },
    createdAt:  { type: Date, default: Date.now },
    updatedAt:  { type: Date, default: Date.now }
});

const option = mongoose.model('Option',optionschema)

module.exports = option;