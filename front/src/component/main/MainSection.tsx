import React, { useState } from 'react';
import styled from 'styled-components';
import ValorantButton from './Valorant';
import { useSound } from '../../soundEffects/soundContext';
import Modal from '../../component/member/MemberModal'; // 로그인 모달 컴포넌트 임포트

const Section = styled.section`
  height: 90vh;
  background-image: url('/game_map_imgs/023.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;
  padding-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 150px;
  color: #FFFFFF;
  margin-top: 0; 
  span {
    color: #00FCCE;
  }
`;

export const MainSection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
  const [showModal, setShowModal] = useState<boolean>(false);

  const handlePlayClick = () => {
    if (isLoggedIn) {
      // 로그인된 상태면 다운로드 페이지로 리다이렉트
      window.location.href = 'https://drive.google.com/drive/folders/1H3Vu7W23ncNROTAzaETTinRp07GbR9Eo?usp=sharing';
    } else {
      // 로그인되지 않았으면 모달창 표시
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Section>
      <Logo>
        Tri<span>gg</span>er
      </Logo>
      <ValorantButton label="무료로 플레이하기" onClick={handlePlayClick} />
      {showModal && <Modal onClose={handleCloseModal} />}
    </Section>
  );
};

export default MainSection;
