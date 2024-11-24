const { Router } = require("express");
const { protectRoutes, requireAdmin } = require("../middleware/auth.middleware.js");
const { getStats } = require("../controller/stats.controller.js");

const router = Router();

router.get("/", protectRoutes, requireAdmin, getStats);

module.exports = router;
