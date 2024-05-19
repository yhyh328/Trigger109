import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../main/Button';
import './MemberModal.css';
import { prepareGunLoad, prepareGunShot } from '../../soundEffects/soundEffects';
import { useSound } from '../../soundEffects/soundContext';
import styled from 'styled-components';

const SignUpButton = styled(Button)``;
const LoginButton = styled(Button)``;

interface ModalProps {
    onClose: () => void; // 닫기 버튼 핸들러
}

const Modal = ({ onClose }: ModalProps): JSX.Element => {
    const navigate = useNavigate();
    const playGunLoad = prepareGunLoad();
    const playGunShot = prepareGunShot();
    const { isSoundEnabled } = useSound();

    const handleButtonEnter = () => {
        if (isSoundEnabled) {
            playGunLoad.play().catch(err => console.error('Error playing gun load:', err));
        }
    }

    const handleSignUpClick = () => {
        if (isSoundEnabled) {
            playGunShot.play().catch(err => console.error('Error playing gunshot:', err));
        }
        onClose(); // 모달 창 닫기
        navigate('/signup'); // 페이지 이동
        console.log('생성하기 클릭');
    }

    const handleLoginClick = () => {
        if (isSoundEnabled) {
            playGunShot.play().catch(err => console.error('Error playing gunshot:', err));
        }
        onClose(); // 모달 창 닫기
        navigate('/login'); // 페이지 이동
        console.log('로그인 클릭');
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
                    onClick={handleSignUpClick}
                />
                <LoginButton
                    label="로그인"
                    onMouseEnter={handleButtonEnter}
                    onClick={handleLoginClick}
                />
            </div>
        </div>
    );
};

export default Modal;
