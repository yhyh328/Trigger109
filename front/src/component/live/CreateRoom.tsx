import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
}

const CreateRoom: React.FC<ModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState<string>('');

  if (!isOpen) {
    return null;
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCreateClick = (event: MouseEvent<HTMLButtonElement>) => {
    onCreate(title);
    setTitle('');
    onClose();
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
          value={title}
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
