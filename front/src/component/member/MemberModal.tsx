import React from 'react';
// import ValorantButton from '../../component/main/Valorant'; // 외부 버튼 컴포넌트를 임포트
import Button from '../main/Button';
import './MemberModal.css'
import { prepareGunLoad, prepareGunShot } from '../../soundEffects/soundEffects';
import { useSound } from '../../soundEffects/soundContext';
import styled from 'styled-components';


const SignUpButton = styled(Button)``;
const LoginButton = styled(Button)``;


interface ModalProps {
  onClose: () => void; // 닫기 버튼 핸들러
}

const Modal = ({ onClose }: ModalProps): JSX.Element => {

  const playGunLoad = prepareGunLoad();
  const playGunShot = prepareGunShot();

  const { isSoundEnabled } = useSound();

  const handleButtonEnter = () => {
    if (isSoundEnabled) {
      playGunLoad.play().catch(err => console.error('Error playing gun load:', err));
    }
  }

  const handleButtonClick = () => {
    if (isSoundEnabled) {
      playGunShot.play().catch(err => console.error('Error playing gunshot:', err));
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>/ Trigger 플레이하기 /</h2>
        <SignUpButton 
          label="생성하기" 
          onMouseEnter={handleButtonEnter}
          onClick={() => {
            handleButtonClick();
            console.log('생성하기 클릭');
          }} 
        />
        <LoginButton 
          label="로그인" 
          onMouseEnter={handleButtonEnter}
          onClick={() => {
            handleButtonClick();
            console.log('로그인 클릭')
          }} 
        />
      </div>
    </div>
  );
};

export default Modal;
