import React from 'react';
import styled from 'styled-components';
import ValorantButton from './Valorant';
import { useSound } from '../../soundEffects/soundContext';


const handlePlayClick = () => {
  console.log("Play button clicked!");
  // 플레이 버튼 클릭 시 수행할 작업
};

// Section 컴포넌트에 스타일을 적용합니다.
const Section = styled.section`
  height: 90vh;
  background-image: url('/valorant6.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 섹션의 하단에 내용을 정렬합니다.
  align-items: center;       // 내용을 가로축 중앙에 정렬합니다.
  color: white;
  padding-bottom: 20px;      // 하단 패딩을 추가하여 버튼이 바닥에 닿지 않게 합니다.
`;

const Logo = styled.h1`
  font-size: 150px;
  color: #FFFFFF;
  margin-top: 0; 
  span {
    color: #00FCCE;
  }
`;

const CheckboxContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column; 
  align-items: flex-end;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  font-size: 10px;
`;

const CheckboxLabel = styled.div`
  margin-top: 0; 
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

export const MainSection: React.FC = () => {
  
  const { isSoundEnabled, toggleSound } = useSound();
  
  return (
    <Section>
      <CheckboxContainer>
          <CheckboxLabel>
            Allow Sound Effects
            <Checkbox 
              type="checkbox" 
              checked={isSoundEnabled} 
              onChange={toggleSound} 
            />
          </CheckboxLabel>
          <CheckboxLabel>
            Allow Push Notifications
            <Checkbox 
              type="checkbox" 
              checked={false} // 따로 관련 함수 만들어야 함
              onChange={() => {}} // 따로 관련 함수 만들어야 함
            />
          </CheckboxLabel>
        </CheckboxContainer>
      <Logo>
        Tri<span>gg</span>er
      </Logo>
      
      <ValorantButton label="무료로 플레이하기" onClick={handlePlayClick} />
    </Section>
  );
}
