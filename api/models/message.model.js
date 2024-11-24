const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      // Clerk user ID
      type: String,
      required: true,
    },
    receiverId: {
      // Clerk user ID
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
