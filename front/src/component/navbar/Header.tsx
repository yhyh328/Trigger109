import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  padding: 5px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;   /* 이 부분을 추가합니다. */
  top: 0;            /* 화면의 맨 위에 위치시킵니다. */
  left: 0;           /* 화면의 왼쪽 끝부터 시작합니다. */
  right: 0;          /* 화면의 오른쪽 끝까지 확장합니다. */
  z-index: 1000;     /* 다른 요소들 위에 표시될 수 있도록 z-index를 설정합니다. */
`;


const Logo = styled.h1`
  font-size: 24px;
  color: #FFFFFF;
  font-family: 'Audiowide', sans-serif;
  span {
    color: #00FCCE
  }
`;

const Nav = styled.nav`
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

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>Tri<span>gg</span>er</Logo>
      <Nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </Nav>
    </HeaderContainer>
  );
}
