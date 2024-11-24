const { clerkClient } = require("@clerk/express");

const protectRoutes = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({
      message: "Unauthorized - Please login first",
    });
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized - You must be an admin :)",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  protectRoutes,
  requireAdmin,
};
