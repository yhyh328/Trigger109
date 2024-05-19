import React from 'react';
import styled from 'styled-components';
import PlayButton from './Button';
import { useSound } from '../../soundEffects/soundContext';
import { prepareGunShot, prepareGunLoad } from '../../soundEffects/soundEffects';

// Section component styles
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

// MainSection function component
export const MainSection: React.FC = () => {
  // Correct placement of useSound and sound preparation functions
  const { isSoundEnabled } = useSound();
  const playGunLoad = prepareGunLoad();
  const playGunShot = prepareGunShot();


  const handlePlayButtonEnter = () => {
    if (isSoundEnabled) {
      playGunLoad.play().catch(err => console.error('Error playing gun load:', err));
    }
  };

  const handlePlayClick = () => {
    if (isSoundEnabled) {
      playGunShot.play().catch(err => console.error('Error playing gun load:', err));
    }
    console.log("Play button clicked!");
  };

  return (
    <Section>
      <Logo>Tri<span>gg</span>er</Logo>
      <PlayButton 
        label="무료로 플레이하기" 
        onMouseEnter={handlePlayButtonEnter} 
        onClick={handlePlayClick} 
      />
    </Section>
  );
};
