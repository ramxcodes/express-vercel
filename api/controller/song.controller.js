const { Song } = require("../models/song.model.js");

const getAllSongs = async (req, res, next) => {
  try {
    // -1 is for descending order => Newest -> older
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

const getFeaturedSongs = async (req, res, next) => {
  try {
    // Fetch 6 random songs
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

const getMadeForYouSongs = async (req, res, next) => {
  try {
    // Fetch 4 random songs
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

const getTrendingSongs = async (req, res, next) => {
  try {
    // Fetch 4 random songs
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

const searchSongsByNameOrArtist = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }

    const songs = await Song.fuzzySearch(name);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
  searchSongsByNameOrArtist,
};
