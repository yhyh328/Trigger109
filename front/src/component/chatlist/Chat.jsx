import React, { useEffect, useState } from "react";
import socket from "../../server"; 
import InputField from "./InputField/InputField";
import MessageContainer from "./MessageContainer/MessageContainer"; 

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList(prevState => [...prevState, message]);
    });

    const userName = prompt("당신의 이름을 입력하세요");
    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
    });

    return () => socket.off('message'); 
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
