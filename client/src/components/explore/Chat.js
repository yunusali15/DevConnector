import "../../styles.css";
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChat, getChats, recieveText, updateChat } from "../../actions/chat";
import Moment from "react-moment";
import { SET_LOADING } from "../../actions/types";
import { joinChat, sendText } from "./chatSocket";

const Chat = ({
   chat: { chats, chat, loading },
   auth: { user },
   getChats,
   getChat,
   recieveText,
   updateChat,
}) => {
   useEffect(() => {
      getChats();
      console.log(chat);
      joinChat(user._id);
   }, [getChats]);

   const [text, setText] = useState("");

   const onSend = async (e) => {
      setText(text.trim());
      e.preventDefault();
      if (text && chat) {
         await updateChat({ chatId: chat._id, text });
         setText("");
         sendText(chat, user._id);
      }
   };

   const displayChatBoxes = (chat) => {
      let displayUser = "";
      chat.users[0]._id === user._id
         ? (displayUser = chat.users[1])
         : (displayUser = chat.users[0]);

      return (
         <div className="chatbox-container">
            <div className="chat-list-box">
               <img
                  style={{
                     width: "20%",
                     borderRadius: "50%",
                  }}
                  src={displayUser.avatar && displayUser.avatar}
                  alt=""
               />
               <div className="chatbox-meta">
                  <div className="chatbox-name">
                     {displayUser.name.length > 12
                        ? displayUser.name.slice(0, 12).concat("...")
                        : displayUser.name}
                  </div>
                  <div className="chatbox-last-message">
                     <div>
                        {chat.history[0].text.length > 25
                           ? chat.history[0].text.slice(0, 25).concat("...")
                           : chat.history[0].text}
                     </div>
                  </div>
               </div>
            </div>
            <Moment
               format="ddd h:mm a"
               style={{
                  alignContent: "flex-start",
                  fontSize: "10px",
                  fontStyle: "italic",
                  fontWeight: "lighter",
                  whiteSpace: "nowrap",
               }}>
               {chat.history[0].createdAt}
            </Moment>
         </div>
      );
   };

   const onClick = (chatId) => {
      getChat(chatId);
   };

   const onChange = (e) => setText(e.target.value);

   return (
      <Fragment>
         <section
            className="container"
            style={{ padding: "0", boxShadow: "5px 10px" }}>
            {!loading && chats && chats.length > 0 ? (
               <div className="chat">
                  <div className="chat__sidebar">
                     {chats.map((chat) => (
                        <div
                           className="room-title"
                           key={chat._id}
                           onClick={() => onClick(chat._id)}>
                           {displayChatBoxes(chat)}
                        </div>
                     ))}
                  </div>
                  {!loading &&
                  chat &&
                  chat.history &&
                  chat.history[0].sentBy ? (
                     <div className="chat__main">
                        <div className="chat__messages">
                           {chat.history.map((message) => (
                              <div
                                 key={message._id}
                                 className={`message-${
                                    message.sentBy != null &&
                                    message.sentBy === user._id
                                 }`}>
                                 <p>
                                    <span className="message__name">
                                       {message.text}
                                    </span>
                                 </p>
                              </div>
                           ))}
                        </div>
                        <div className="compose">
                           <form onSubmit={(e) => onSend(e)}>
                              <input
                                 name="message"
                                 value={text}
                                 onChange={(e) => onChange(e)}
                                 placeholder="Message"></input>
                              <button type="submit">Send</button>
                           </form>
                        </div>
                     </div>
                  ) : (
                     <div className="chat__main">Select a chat to continue</div>
                  )}
               </div>
            ) : (
               <Fragment>No Active Chats Found</Fragment>
            )}
         </section>
      </Fragment>
   );
};

Chat.propTypes = {
   chat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   chat: state.chat,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   recieveText,
   getChats,
   getChat,
   updateChat,
})(Chat);
