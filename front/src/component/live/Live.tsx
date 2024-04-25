import React from 'react';
import styled from 'styled-components';
import Chat from '../chatlist/Chat';

// 스타일 컴포넌트 정의
const LiveContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const VideoContainer = styled.div`
  flex: 3;
  background-color: #000;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: #f2f2f2;
`;

// 채팅 컴포넌트
const Chat1 = () => {
  return (
    <ChatContainer>
      <Chat />
    </ChatContainer>
  );
};


// 비디오 플레이어 컴포넌트
const VideoPlayer = () => {
  return (
    <VideoContainer>
      <video width="100%" height="100%" controls>
        <source src="your-video-url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};


// 라이브 스트리밍 메인 컴포넌트
const Live = () => {
  return (
    <LiveContainer>
      <VideoPlayer />
      <Chat1 />
    </LiveContainer>
  );
};

export default Live;
