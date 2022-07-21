import io from "socket.io-client";
import store from "../../store";
import { getChat } from "../../actions/chat";

let socket = io();

socket.on("chatUpdate", function (data, callback) {
   callback("error", "message");
   store.dispatch(getChat(data));
});

export const joinChat = (id) => {
   socket.emit("register user", id);
};

export const sendText = (chat, userId) => {
   try {
      const user =
         chat.users[0]._id === userId ? chat.users[1]._id : chat.users[0]._id;
      socket.emit("chatUpdate", { chatId: chat._id, user });
   } catch (err) {
      return err;
   }
};
