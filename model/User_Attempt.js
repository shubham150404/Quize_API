const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserQuizAttemptSchema = new Schema({
    userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quizId:      { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score:       { type: Number, required: true },
    attemptedAt: { type: Date, default: Date.now }
});

const UserAttempt = mongoose.model('UserAttempt',UserQuizAttemptSchema)

module.exports = UserAttempt;