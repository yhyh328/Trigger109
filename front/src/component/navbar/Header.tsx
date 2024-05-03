import React from 'react';
import styled from 'styled-components';

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
  margin-right: 20px; // 로고와 네비게이션 사이의 간격

  a, a:hover, a:active, a:visited {
    color: inherit; // Inherits the color from the parent h1 element
    text-decoration: none; // Removes underline from all link states
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
  margin-left: auto; // 왼쪽에 있는 요소들로부터 자동으로 오른쪽으로 밀려나게 설정
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

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <a href="/">Tri<span>gg</span>er</a>
      </Logo>
      <Nav>
        <a href="#">공지사항</a>
        <a href="#">랭킹</a>
        <a href="/live">라이브</a>
        <a href="#">가이드</a>
      </Nav>
      <PlayButton>지금 플레이하기</PlayButton>
    </HeaderContainer>
  );
}
