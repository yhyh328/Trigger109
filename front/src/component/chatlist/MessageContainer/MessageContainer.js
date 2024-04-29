import React, { useEffect, useRef } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  const messageContainerRef = useRef(null); 

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div className="message-container" ref={messageContainerRef}> {/* 스크롤바 CSS 적용 */}
      {messageList.map((message, index) => {
        const isMyMessage = message.user.name === user.name;
        const isSystemMessage = message.user.name === "system";
        return (
          <Container key={message._id} className={`${isMyMessage ? 'my-message-container' : 'your-message-container'}`}>
            {isSystemMessage ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : isMyMessage ? (
              <div className="my-message-container">
                <div className="message-content">
                  <p className="sender-name">{message.user.name}</p>
                  <div className="my-message">{message.chat}</div>
                </div>
              </div>
            ) : (
              <div className="your-message-container">
                <div className="message-content">
                  <p className="sender-name">{message.user.name}</p>
                  <div className="your-message">{message.chat}</div>
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
