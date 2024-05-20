import React from 'react';
import styled from 'styled-components';
import GuideButton from './Button';
import { useNavigate } from 'react-router-dom';
import { prepareGunShot, prepareGunLoad } from '../../soundEffects/soundEffects';
import { useSound } from '../../soundEffects/soundContext';

// 이미지 파일 경로를 import합니다. 경로는 실제 파일 위치에 따라 달라집니다.
// import valorantImage from './path/to/valorant3.png'; 

const sizes = {
  mobile: '600px',
  tablet: '768px',
  desktop: '992px'
};

// Media queries 헬퍼 함수
const media = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`
};

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
  margin-bottom: 200px;
`;

const GuideButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
`

const Logo = styled.h1`
  font-size: 150px;
  color: #FFFFFF;
  margin-top: 0;
  margin-bottom: 0;
  span {
    color: #00FCCE;
  }
`;

const StyledImage = styled.img`
  max-width: 100%; // 이미지가 컨테이너를 벗어나지 않도록 합니다.
  height: auto; // 이미지의 비율을 유지합니다.
  margin-top: 0;
   object-fit: cover; // 컨테이너를 가득 채우도록 비율을 조정합니다.
  width: 100%; // 컨테이너의 너비에 맞게 설정합니다.
  height: 145%; // 컨테이너의 높이에 맞게 설정합니다.
`;


// 컴포넌트 정의...
const MainSection4 = () => {

  const playGunLoad = prepareGunLoad();
  const playGunShot = prepareGunShot();

  const { isSoundEnabled } = useSound();

  const handleGuideButtonEnter = () => {
    if (isSoundEnabled) {
      playGunLoad.play().catch(err => console.error('Error playing gun load:', err));
    }
  }

  const navigate = useNavigate();

  const handleGuideButtonClick = () => {
    if (isSoundEnabled) {
      playGunShot.play().catch(err => console.error('Error playing gunshot:', err));
    }
    navigate('/guide');
    window.scrollTo(0, 0);
  }

  return (
    <GuidContainer>
      <GuidItemContainer>
        <br />
        <br />
        <br />
        <Logo>Tri<span>gg</span>er</Logo>
        <h1>벚꽃의 전쟁 : 전투 생존 배틀로얄</h1>
        <h3>
        2024년, 도쿄. 고대와 현대가 공존하는 이 도시는 매년 봄, 수천 그루의 벚나무가 만개하여 아름다운 장관을 이룬다. 그러나 이 아름다움 뒤에는 어두운 비밀이 숨겨져 있다. 도쿄는 비밀조직의 중심지로, 이 조직은 벚꽃이 만개하는 시기에 맞춰 '벚꽃의 전쟁'이라는 잔혹한 대회를 개최한다.
        <br/>
        <br/>
        주인공 싸이백구(Cyborg + 109)는 어느 날 갑자기 납치되어 도쿄의 낯선 거리에서 깨어난다. 그는 자신이 반은 인간, 반은 기계로 개조된 존재임을 깨닫고 벚꽃의 전쟁에 참여하게 된다. 이 대회는 비밀조직에 의해 주관되며, 참가자들은 생존을 위해 서로 싸워야 한다. 최후의 승자는 자유를 얻게 되지만, 패자는 죽음을 맞이하게 되는데..
        </h3>
        {/* 기타 텍스트 내용 */}
        <GuideButtonContainer>
          <GuideButton 
            label="게임 배우기" 
            onMouseEnter={handleGuideButtonEnter} 
            onClick={handleGuideButtonClick} 
          />
        </GuideButtonContainer>
        <br />
        <br />
      </GuidItemContainer>
      <ImageContainer>
        {/* 이미지 경로를 정확하게 지정해야 합니다. */}
        <StyledImage src='/game_map_imgs/Capture.PNG' alt='Trigger' />
      </ImageContainer>
    </GuidContainer>
  );
};

export default MainSection4;


