import React from 'react';
import ValorantButton from '../../component/main/Valorant'; // 외부 버튼 컴포넌트를 임포트
import './MemberModal.css'

interface ModalProps {
  onClose: () => void; // 닫기 버튼 핸들러
}

const Modal = ({ onClose }: ModalProps): JSX.Element => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>/ Trigger 플레이하기/</h2>
        <ValorantButton label="생성하기" onClick={() => console.log('생성하기 클릭')} />
        <ValorantButton label="로그인" onClick={() => console.log('로그인 클릭')} />
      </div>
    </div>
  );
};

export default Modal;
