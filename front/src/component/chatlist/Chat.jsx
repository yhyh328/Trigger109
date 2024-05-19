import React, { useEffect, useState } from "react";
import axios from 'axios';
import socket from "../../server"; 
import InputField from "./InputField/InputField";
import MessageContainer from "./MessageContainer/MessageContainer"; 
import { fetchUserInfo, Member } from '../../api/getuser';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList(prevState => [...prevState, message]);
    });

    // 사용자 정보를 불러오고 로그인 처리
    const loadAndLoginUser = async () => {
      const userInfo = await fetchUserInfo();
      console.log("chatLoginUserInfo", userInfo)
      if (userInfo) {
        socket.emit("login", userInfo.id, (res) => {
          if (res?.ok) {
            setUser(userInfo);
            console.log("Logged in with user ID:", userInfo.id);
          }
        });
      }
    };

    loadAndLoginUser();

    return () => socket.off('message'); 
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, (res) => {
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
