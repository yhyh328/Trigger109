import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../component/member/MemberModal';  // 모달 컴포넌트를 임포트

const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  padding: 5px 50px;
  display: flex;
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

export const Header = () => {
  const [showModal, setShowModal] = useState(false);  // 모달의 표시 상태를 관리하는 state

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <HeaderContainer>
        <Logo>
          <a href="/">Tri<span>gg</span>er</a>
        </Logo>
        <Nav>
          <a href="/notifications">공지사항</a>
          <a href="#">랭킹</a>
          <a href="/live">라이브</a>
          <a href="/guide">가이드</a>
        </Nav>
        <PlayButton onClick={handleOpenModal}>지금 플레이하기</PlayButton>
      </HeaderContainer>
      {showModal && <Modal onClose={handleCloseModal} />}  // 모달 컴포넌트를 조건부 렌더링
    </>
  );
}
