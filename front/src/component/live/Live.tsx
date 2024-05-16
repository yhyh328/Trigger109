import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import { fetchUserInfo, Member } from '../../api/getuser';

interface Stream {
  userId: string;
  title: string;
}

const Live = () => {
  const [member, setMember] = useState<Member | null>(null);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setMember(userInfo);
        console.log(userInfo)
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    loadUserInfo();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const createStream = (title: string) => {
    if (!title) {
      alert('Please enter a title for the stream.');
      return;
    }
    const newUserId = `user${streams.length + 1}`; // 새로운 유저 ID 생성
    const newStream = { userId: newUserId, title: title }; // 새 스트림 객체 생성
    setStreams(prevStreams => [...prevStreams, newStream]); // 상태 업데이트
    handleModalClose(); // 모달 닫기
  };

  return (
    <div>
      <h1>Live Streams</h1>
      {member && <button onClick={handleModalOpen}>Create New Stream</button>}
      {isModalOpen && (
        <CreateRoom
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onCreate={createStream}
          memberId={member ? member.memberId.toString() : ''}
        />
      )}
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