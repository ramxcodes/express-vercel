const { User } = require("../models/user.model.js");

const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Signup
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};

module.exports = {
  authCallback,
};
