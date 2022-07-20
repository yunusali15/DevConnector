const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Chat = require("../../models/Chat");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const req = require("express/lib/request");
const config = require("config");

//@route GET api/chats/
//@access Private (User needs to login to see chats)
//@desc Get all chats of user
router.get("/", auth, async (req, res) => {
   try {
      const chats = await Chat.find({ users: { $in: [req.user.id] } }).populate(
         "users",
         ["name", "avatar"]
      );

      if (chats.length == 0) {
         return res.status(404).json({ msg: "No Chats found!" });
      }
      res.json(chats);
   } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
   }
});

router.get("/user/:id", auth, async (req, res) => {
   try {
      let chat = await Chat.findOne({
         users: { $all: [req.user.id, req.params.id] },
      });

      if (!chat) {
         return res.status(404).json({ msg: "No Chat found!" });
      }
      res.json(chat);
   } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
   }
});

//@route GET api/chats/:id
//@access Private (User needs to login to see chats)
//@desc Get chat of user with user id in params
router.get("/:id", auth, async (req, res) => {
   try {
      const chat = await Chat.findById(req.params.id).populate("users", [
         "name",
         "avatar",
      ]);

      if (!chat) {
         return res.status(404).json({ msg: "No Chat found!" });
      }
      res.json(chat);
   } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
   }
});

//@route POST api/chats/:id
//@access Private (User needs to login to see chats)
//@desc Create chat of user with user id in params
router.post("/:id", auth, async (req, res) => {
   try {
      let chat = await Chat.findOne({
         users: { $all: [req.user.id, req.params.id] },
      });

      if (chat) {
         return res.status(400).json({ msg: "Chat Already exists!" });
      }
      const newChat = new Chat({
         users: [req.user.id, req.params.id],
         history: [{ text: req.body.text, sentBy: req.user.id }],
      });

      chat = await newChat.save();
      res.json(chat);
   } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
   }
});

//@route DELETE api/chats/:id
//@access Private (User needs to login to see chats)
//@desc Delete chat of user with user id in params
router.delete("/:id", auth, async (req, res) => {
   try {
      let chat = await Chat.findOne({
         users: { $all: [req.user.id, req.params.id] },
      });

      if (!chat) {
         return res.status(404).json({ msg: "No Chat found!" });
      }

      chat = await Chat.findByIdAndRemove(chat.id);

      res.json(chat);
   } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
   }
});

//@route PUT api/chats/:id
//@access Private (User needs to login to see chats)
//@desc Update chat of chat id in the params
router.put("/:id", auth, async (req, res) => {
   try {
      let chat = await Chat.findById(req.params.id).populate("users", [
         "name",
         "avatar",
      ]);
      if (!chat) {
         return res.status(404).json({ msg: "No Chat found!" });
      }

      const newText = {
         text: req.body.text,
         sentBy: req.user.id,
      };

      chat.history.unshift(newText);
      chat = await chat.save();
      res.json(chat);
   } catch (err) {
      console.error(err.message);
      return res.status(500).json("Server Error");
   }
});

module.exports = router;
