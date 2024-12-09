const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
   users: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
         required: true,
      },
   ],
   history: [
      {
         createdAt: {
            type: Date,
            default: Date.now(),
         },
         text: {
            type: String,
            required: true,
         },
         sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
         },
         seen: {
            type: Boolean,
         },
      },
   ],
});

module.exports = Chat = mongoose.model("chat", ChatSchema);
