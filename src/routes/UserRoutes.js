const express = require("express")
const userController = require("../controllers/UserController")
const router = express.Router()

router.post("/cadastrar", userController.cadastrar)
router.post("/login", userController.login)


module.exports = router