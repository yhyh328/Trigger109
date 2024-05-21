import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { createRoom } from '../../api/createroom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  memberId: string;
}

const CreateRoom: React.FC<ModalProps> = ({ isOpen, onClose, onCreate, memberId }) => {
  const [roomTitle, setTitle] = useState<string>('');

  if (!isOpen) {
    return null;
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCreateClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Attempting to create room with:", { memberId, roomTitle });
    try {
      // API 호출
      const roomData = { memberId, roomTitle };
      const roomInfo = await createRoom(memberId, roomData);
      console.log('Room created successfully:', roomInfo);
      setTitle('');
      onClose(); // 방 생성 후 모달 닫기
    } catch (error) {
      console.error('Failed to create room:', error);
      console.log("memberId", memberId)
      alert('Failed to create room. Please try again.');
    }
  };

  const handleCancelClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClose();
  };


  return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          padding: '20px',
          background: 'white',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <input
              type="text"
              value={roomTitle}
              onChange={handleTitleChange}
              placeholder="Enter stream title"
          />
          <button onClick={handleCreateClick}>Create Stream</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
  );
};

export default CreateRoom;
