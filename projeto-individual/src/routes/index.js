var express = require("express");
var path = require("path");
const router = express.Router();

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/homePage.html"));
});


module.exports = router