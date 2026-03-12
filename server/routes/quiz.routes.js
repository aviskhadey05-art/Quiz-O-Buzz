const express = require("express");

const router = express.Router();

const { createQuiz, getQuizById, updateTimeLimit, getTeacherQuizzes, toggleQuizStatus, publishQuiz } = require("../controllers/quiz.controller");

router.post("/create", createQuiz);
router.get("/my-quizzes", getTeacherQuizzes);
router.get("/:id", getQuizById);
router.put("/:id/time", updateTimeLimit);
router.put("/:id/publish", publishQuiz);
router.put("/toggle/:id", toggleQuizStatus);

module.exports = router;