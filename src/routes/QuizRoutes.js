const express = require("express")
const quizController = require("../controllers/QuizController")
const router = express.Router()

router.get("/get-quiz/:id", quizController.getQuiz)



module.exports = router