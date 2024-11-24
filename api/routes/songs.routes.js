const { Router } = require("express");
const {
  protectRoutes,
  requireAdmin,
} = require("../middleware/auth.middleware.js");
const {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
  searchSongsByNameOrArtist,
} = require("../controller/song.controller.js");

const router = Router();

router.get("/", protectRoutes, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get("/search", searchSongsByNameOrArtist);

module.exports = router;
