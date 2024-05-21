import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import { fetchUserInfo, Member } from '../../api/getuser';
import { getRoomInfo } from '../../api/getroominfo';
import './Live.css'

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

    const loadRoomInfo = async () => {
      try {
        const rooms = await getRoomInfo();
        setStreams(rooms.map(room => ({
          userId: room.roomId.toString(),  // `roomId`를 `userId`로 사용합니다. (필요하다면 이름을 변경하세요)
          title: room.roomTitle            // 방제목을 `title`에 매핑
        })));
      } catch (error) {
        console.error('방 정보를 불러오는 중 오류 발생:', error);
      }
    };

    loadUserInfo();
    loadRoomInfo();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const createStream = (title: string) => {
    if (!title) {
      alert('스트림의 제목을 입력해주세요.');
      return;
    }
    const newUserId = `user${streams.length + 1}`; // 새로운 유저 ID 생성
    const newStream = { userId: newUserId, title: title }; // 새 스트림 객체 생성
    setStreams(prevStreams => [...prevStreams, newStream]); // 상태 업데이트
    handleModalClose(); // 모달 닫기
  };

  return (
      <div className="live-stream" >
        <div>
          <h1>Live Streams</h1>
          {member && <button onClick={handleModalOpen}>Create New Stream</button>}
          {isModalOpen && (
              <CreateRoom
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  onCreate={createStream}
                  memberId={member?.memberId?.toString() ?? ''}
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
      </div>
  );
};

export default Live;