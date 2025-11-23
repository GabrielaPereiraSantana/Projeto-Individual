const express = require("express")
const userController = require("../controllers/UserController")
const router = express.Router()

router.post("/cadastrar", userController.cadastrar)
router.get("/get-cats", userController.getCats)
router.post("/login", userController.login)
router.get("/get-all", userController.getAllUsers)
router.get("/:id", userController.usuarioId)



module.exports = router