const { Router } = require("express");
const { getAlbumById, getAllAlbums } = require("../controller/album.controller.js");

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

module.exports = router;
