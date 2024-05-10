import React from 'react';
import styled from 'styled-components';
import Chat from '../chatlist/Chat';
import Video from './video';

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

const VideoPlayer = () => {
    return (
        <VideoContainer>
            <Video />
        </VideoContainer>
    );
};

const Live = () => {
    const handleEvent = () => {
        console.log('Event occurred!');
        // 원하는 이벤트가 발생했을 때 로그 출력
    };

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
