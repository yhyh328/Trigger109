import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSound } from '../../soundEffects/soundContext';
import Modal from '../../component/member/MemberModal'; // 모달 컴포넌트를 임포트
import { preparePlasma, prepareZap } from '../../soundEffects/soundEffects';


const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  padding: 5px 50px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #FFFFFF;
  font-family: 'Audiowide', sans-serif;
  margin-right: 20px;

  a, a:hover, a:active, a:visited {
    color: inherit;
    text-decoration: none;
  }

  span {
    color: #00FCCE;
  }
`;

const Nav = styled.nav`
  display: flex;
  a {
    color: white;
    text-decoration: none;
    margin-left: 30px;
    font-size: 18px;
    &:hover {
      color: #00FCCE;
    }
  }
`;

const PlayButton = styled.button`
  margin-left: auto;
  background-color: #00FCCE;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #009988;
  }
`;

const CheckboxContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column; 
  align-items: flex-end;
  color: white;
  cursor: pointer;

  margin-right: -560px;
  font-size: 10px;
`;

const CheckboxLabel = styled.div`
  margin-top: 10px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px; // 각 체크박스 사이의 간격 조정
`;

const Checkbox = styled.input`
  accent-color: #00FCCE; /* This changes the color of the checkbox */
  margin-right: 8px;
`;

export const Header: React.FC = () => {
  const playZap = prepareZap();
  const playPlasma = preparePlasma();
  const { isSoundEnabled, toggleSound } = useSound();

  
  useEffect(() => {
    // console.log('playZap', playZap);
  }, [playZap]);

  const handleZap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = (e.target as HTMLAnchorElement).getAttribute('href');
    if (isSoundEnabled) {
      playZap.play()
        .catch((err: any) => console.error('Error playing zap:', err))
        .finally(() => {
          if (href) {
            setTimeout(() => {
              window.location.href = href;
            }, 100); // Duration of zap sound effect
          }
        });
    } else if (href) {
      window.location.href = href;
    }
  }

  const handlePlasma = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = (e.target as HTMLAnchorElement).getAttribute('href');
    if (isSoundEnabled) {
      playZap.play()
        .catch((err: any) => console.error('Error playing plasma:', err))
        .finally(() => {
          if (href) {
            setTimeout(() => {
              window.location.href = href;
            }, 300); // Duration of plasma sound effect
          }
        });
    } else if (href) {
      window.location.href = href;
    }
  }

  const [showModal, setShowModal] = useState(false); // 모달의 표시 상태를 관리하는 state
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <HeaderContainer>
        <Logo>
          <a href="/" >Tri<span>gg</span>er</a>
        </Logo>
        <Nav>
          <a href="/notifications" onClick={handleZap}>
            공지사항
          </a>
          <a href="/ranking" onClick={handleZap}>
            랭킹
          </a>
          <a href="/live" onClick={handleZap}>라이브</a>
          <a href="/guide" onClick={handleZap}>가이드</a>
        </Nav>
        <CheckboxContainer>
          <CheckboxLabel>
            Allow Sound Effects
            <Checkbox 
              type="checkbox" 
              checked={isSoundEnabled} 
              onChange={toggleSound} 
            />
          </CheckboxLabel>
        </CheckboxContainer>
        <PlayButton onClick={handleOpenModal}>지금 플레이하기</PlayButton>
      </HeaderContainer>
      {showModal && <Modal onClose={handleCloseModal} />} {/* 모달 컴포넌트를 조건부 렌더링 */}
    </>
  );
}
