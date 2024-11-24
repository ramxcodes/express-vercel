const { Router } = require("express");
const { authCallback } = require("../controller/auth.controller.js");

const router = Router();

router.post("/callback", authCallback);

module.exports = router;
