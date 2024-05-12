import React from 'react';
import styled from 'styled-components';
import { useSound } from '../../soundEffects/soundContext';

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

const CheckboxContainer = styled.label`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  font-size: 10px;
`;

const Checkbox = styled.input`
  accent-color: #00FCCE; /* This changes the color of the checkbox */
  margin-right: 8px;
`;

export const Header: React.FC = () => {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
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
      <CheckboxContainer>
        Sound Effects
        <Checkbox 
          type="checkbox" 
          checked={isSoundEnabled} 
          onChange={toggleSound}
        />
      </CheckboxContainer>
      <PlayButton>지금 플레이하기</PlayButton>
    </HeaderContainer>
  );
}
