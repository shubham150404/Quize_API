const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Questionschema = new Schema({
    quizId:         { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionText:   { type: String, required: true },
    options:        [{ type: Schema.Types.ObjectId, ref: 'Option' }],
    createdAt:      { type: Date, default: Date.now },
    updatedAt:      { type: Date, default: Date.now }
});

const Question = mongoose.model('Question',Questionschema)

module.exports = Question;