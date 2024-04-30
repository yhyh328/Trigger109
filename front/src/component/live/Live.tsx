import React from 'react';
import { Link } from 'react-router-dom';

const Live = () => {
  const streams = [
    { userId: 'user1', title: 'Nature Walks' },
    { userId: 'user2', title: 'City Tours' },
    { userId: 'user3', title: 'Gaming Session' },
    // 더 많은 스트림을 추가할 수 있습니다.
  ];

  return (
    <div>
      <h1>Live Streams</h1>
      <ul>
        {streams.map(stream => (
          <li key={stream.userId}>
            <Link to={`/live/${stream.userId}`}>{stream.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Live;
