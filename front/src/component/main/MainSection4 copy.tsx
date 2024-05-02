import React from 'react';
import styled from 'styled-components';
import GuideButton from './GuideButton';
import { useNavigate } from 'react-router-dom';

// 이미지 파일 경로를 import합니다. 경로는 실제 파일 위치에 따라 달라집니다.
// import valorantImage from './path/to/valorant3.png'; 

const GuidContainer = styled.section`
  display: flex; // Flex 레이아웃 적용
  background-color: #1a1a1d;
  padding: 20px 30px;
`;

const GuidItemContainer = styled.div`
  flex: 1; // flex-grow를 1로 설정하여 가용 공간을 균등하게 채웁니다.
  color: #FFFFFF;
  padding-right: 30px; // 이미지와의 간격을 위한 오른쪽 패딩
`;

const ImageContainer = styled.div`
  flex: 1; // flex-grow를 1로 설정하여 가용 공간을 균등하게 채웁니다.
  display: flex;
  justify-content: center; // 이미지를 중앙 정렬합니다.
  align-items: center; // 이미지를 수직 중앙 정렬합니다.
  margin-top: 200px;
  margin-bottom: 100px;
`;

const GuideButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Corrected the typo here
  align-items: center;
`

const Logo = styled.h1`
  font-size: 150px;
  color: #FFFFFF;
  margin-top: 0; 
  span {
    color: #00FCCE;
  }
`;

const StyledImage = styled.img`
  max-width: 100%; // 이미지가 컨테이너를 벗어나지 않도록 합니다.
  height: auto; // 이미지의 비율을 유지합니다.
  margin-top: 0;
`;


// 컴포넌트 정의...
const MainSection4 = () => {
  const navigate = useNavigate();

  const handleGuideButtonClick = () => {
    console.log("Guide Button clicked!")
    navigate('/guide');
  }

  return (
    <GuidContainer>
      <GuidItemContainer>
        <Logo>Tri<span>gg</span>er</Logo>
        <h1>한계를 돌파하라</h1>
        <h3>
          전 세계의 경쟁 무대에서 여러분의 스타일과 실력을 보여주세요. 정밀한
          사격과 전략 스킬을 사용해 13라운드 동안 공격과 방어를 번갈아 진행하게 됩니다. 
          라운드당 목숨은 하나이며, 생존하려면 상대보다 더 빠르게 판단해야 합니다.
          데스매치와 스파이크 돌격, 경쟁전과 일반전에서 적과 싸워 이기세요.
        </h3>
        {/* 기타 텍스트 내용 */}
        <GuideButtonContainer>
          <GuideButton label="게임 배우기" onClick={handleGuideButtonClick} />
        </GuideButtonContainer>
      </GuidItemContainer>
      <ImageContainer>
        {/* 이미지 경로를 정확하게 지정해야 합니다. */}
        <StyledImage src='./valorant3.png' alt='Valorant' />
      </ImageContainer>
    </GuidContainer>
  );
};

export default MainSection4;
