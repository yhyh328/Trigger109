import React, { useEffect, useState } from "react";
import socket from "../../server";
import InputField from "./InputField/InputField";
import MessageContainer from "./MessageContainer/MessageContainer";
import { fetchUserInfo } from "../../api/getuser"; // 사용자 정보 가져오기 함수 임포트

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const userInfo = await fetchUserInfo(); // 로그인된 사용자 정보 가져오기
        if (userInfo) {
          socket.emit("login", userInfo.nickName, (res) => { // userInfo.nickName 사용
            if (res?.ok) {
              setUser(res.data);
            }
          });
        }
      } catch (error) {
        console.error("Failed to initialize user:", error);
      }

      socket.on('message', (message) => {
        setMessageList(prevState => [...prevState, message]);
      });

      return () => socket.off('message');
    };

    initChat();
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, (res) => {
        console.log("sendMessage res", res);
        setMessage('');
      });
    }
  };

  return (
    <div className="Chat">
      <MessageContainer messageList={messageList} user={user} />
      <InputField 
        message={message} 
        setMessage={setMessage} 
        sendMessage={sendMessage} 
      />
    </div>
  );
};

export default Chat;