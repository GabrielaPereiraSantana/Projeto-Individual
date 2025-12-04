const express = require("express")
const scoreController = require("../controllers/ScoreController")
const router = express.Router()

router.post("/pontuar", scoreController.pontuar)
router.get("/ranking", scoreController.ranking)

module.exports = router