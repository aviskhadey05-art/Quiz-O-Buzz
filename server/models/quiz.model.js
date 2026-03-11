const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({

    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: String,

    questions: Array,

    timeLimit: Number,

    status: {
        type: String,
        default: "draft"
    }

}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);