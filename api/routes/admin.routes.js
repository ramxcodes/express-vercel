const { Router } = require("express");
const { protectRoutes, requireAdmin } = require("../middleware/auth.middleware.js");
const {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} = require("../controller/admin.controller.js");

const router = Router();

// Admin Middleware for all routes
router.use(protectRoutes, requireAdmin);

// Check Admin
router.get("/check", checkAdmin);

// Songs Routes
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

// Album Routes
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

module.exports = router;
