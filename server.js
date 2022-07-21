const express = require("express");
const connectDb = require("./config/db");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

connectDb();

//Init Middleware
app.use(express.json({ extended: false })); //Code needed to get the request body when sending POST req

app.use("/api/users", require("./routes/api/users")); //matches the url to the resources path that is matched to the '/' request of the folder
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profiles", require("./routes/api/profile"));
app.use("/api/chats", require("./routes/api/chat"));

//Serve Static in production
if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
   console.log("New Connection!");

   socket.on("disconnect", () => {
      console.log("user disconnected");
   });

   socket.on("register user", function (id) {
      socket.join(id);
   });

   socket.on("chatUpdate", ({ chatId, user }) => {
      socket.in(user).emit("chatUpdate", chatId, function (error, message) {
         console.log(error);
         console.log(message);
      });
   });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
