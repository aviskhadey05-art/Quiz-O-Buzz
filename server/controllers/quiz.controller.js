const Quiz = require("../models/quiz.model");

exports.createQuiz = async (req, res) => {
    try {

        const { title, timeLimit, questions } = req.body;

        const quiz = new Quiz({
            title,
            timeLimit,
            questions
        });

        await quiz.save();

        res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }
};


exports.getQuizById = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.json(quiz);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};

exports.updateTimeLimit = async (req,res)=>{

    try{

        const {timeLimit} = req.body;

        await Quiz.findByIdAndUpdate(
            req.params.id,
            {timeLimit}
        );

        res.json({
            message:"Time limit updated"
        });

    }
    catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }

};


exports.publishQuiz = async (req,res)=>{

    await Quiz.findByIdAndUpdate(req.params.id,{
        status:"published"
    });

    res.json({
        message:"Quiz published successfully"
    });

};


exports.getTeacherQuizzes = async (req, res) => {

    try {

        const teacherId = req.user.id;

        const quizzes = await Quiz.find({ teacherId });

        res.json(quizzes);

    } catch (error) {

        res.status(500).json({ message: "Server error" });

    }

};


exports.toggleQuizStatus = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        quiz.status = quiz.status === "active" ? "draft" : "active";

        await quiz.save();

        res.json(quiz);

    } catch (error) {

        res.status(500).json({ message: "Server error" });

    }

};