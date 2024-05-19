import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import Modal from 'react-modal';
import './soundContext.css';

interface SoundContextProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const defaultSoundContext: SoundContextProps = {
  isSoundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled') || 'false'),
  toggleSound: () => {}
};

const SoundContext = createContext<SoundContextProps>(defaultSoundContext);

export const useSound = () => useContext(SoundContext);

Modal.setAppElement('#root');

interface SoundProviderProps {
  children: ReactNode;
  onClose?: () => void; // Include the onClose function in the SoundProviderProps
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, onClose }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(defaultSoundContext.isSoundEnabled);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('isSoundEnabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    if (!isSoundEnabled && newState) {
      checkModalSuppression();
    }
  };

  const checkModalSuppression = () => {
    const suppressPromptDate = localStorage.getItem('suppressPromptUntil');
    const currentDate = new Date();
    if (!suppressPromptDate || new Date(suppressPromptDate) < currentDate) {
      setModalIsOpen(true);
    }
  };

  const handleModalClose = (duration: number) => {
    const date = new Date();
    date.setDate(date.getDate() + duration);
    localStorage.setItem('suppressPromptUntil', date.toISOString());
    setModalIsOpen(false);
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        overlayClassName="modal"
        className="modal-content"
        contentLabel="Sound Settings Reminder"
      >
        <button className="close-button" onClick={() => setModalIsOpen(false)}>x</button>
        <h2>Trigger 알림</h2>
        <p>원활한 사운드 이펙트를 즐기기 위해서<br/>웹 브라우저 설정에서 '소리'를 '항상 허용'으로 바꿔주세요!</p>
        <br />
        <br />
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input type="checkbox" onChange={() => handleModalClose(7)} /> 1주일 동안 보지 않기
          </label>
          <label className="checkbox-label">
            <input type="checkbox" onChange={() => handleModalClose(30)} /> 1개월 동안 보지 않기
          </label>
        </div>
      </Modal>
    </SoundContext.Provider>
  );
};
