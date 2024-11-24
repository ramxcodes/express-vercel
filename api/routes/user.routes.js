const { Router } = require("express");
const { protectRoutes } = require("../middleware/auth.middleware.js");
const { getAllUsers, getMessages } = require("../controller/user.controller.js");

const router = Router();

router.get("/", protectRoutes, getAllUsers);
router.get("/messages/:userId", protectRoutes, getMessages);

module.exports = router;
