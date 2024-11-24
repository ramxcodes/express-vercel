const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const { clerkMiddleware } = require("@clerk/express");
const { connectDB } = require("./lib/db.js");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const cron = require("node-cron");

// Routes
const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const adminRoutes = require("./routes/admin.routes.js");
const songRoutes = require("./routes/songs.routes.js");
const albumRoutes = require("./routes/album.routes.js");
const statsRoutes = require("./routes/stats.routes.js");

// Socket
const { initializeSocket } = require("./lib/socket.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const httpServer = http.createServer(app);

// Initialize Socket.IO with httpServer
initializeSocket(httpServer);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB Limit
    },
  })
);

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

module.exports = app;
