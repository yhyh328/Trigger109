import React from 'react';
import styled from 'styled-components';

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

// 채팅 컴포넌트
const Chat = () => {
  return (
    <ChatContainer>
      <p>Chat interface here</p>
    </ChatContainer>
  );
};

// 라이브 스트리밍 메인 컴포넌트
const Live = () => {
  return (
    <LiveContainer>
      <VideoPlayer />
      <Chat />
    </LiveContainer>
  );
};

export default Live;
