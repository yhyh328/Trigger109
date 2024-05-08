import React from 'react';
import styled from 'styled-components';
import Chat from '../chatlist/Chat';
import Video from './video';

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
      <Video />
    </VideoContainer>
  );
};


// 라이브 스트리밍 메인 컴포넌트
const Live = () => {
  return (
    <LiveContainer>
      <VideoPlayer />
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </LiveContainer>
  );
};

export default Live;
