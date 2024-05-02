import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';

interface Stream {
  userId: string;
  title: string;
}

const Live = () => {
  const [streams, setStreams] = useState<Stream[]>([
    { userId: 'user1', title: 'Nature Walks' },
    { userId: 'user2', title: 'City Tours' },
    { userId: 'user3', title: 'Gaming Session' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const createStream = (title: string) => {
    const newUserId = `user${streams.length + 1}`;
    const newStream = { userId: newUserId, title };
    setStreams(prevStreams => [...prevStreams, newStream]);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Live Streams</h1>
      <button onClick={handleModalOpen}>Create New Stream</button>
      <CreateRoom
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={createStream}
      />
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
