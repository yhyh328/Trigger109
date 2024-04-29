import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GuideSection } from './GuideSection';

const GuideTopImg = styled.section`
  height: 80vh;
  background-image: url('/guide/guideBackground.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 섹션의 하단에 내용을 정렬합니다.
  align-items: center;       // 내용을 가로축 중앙에 정렬합니다.
  color: white;
  padding-bottom: 20px;      // 하단 패딩을 추가하여 버튼이 바닥에 닿지 않게 합니다.
`;


const GuidItemContainer = styled.div`
  flex: 1; // flex-grow를 1로 설정하여 가용 공간을 균등하게 채웁니다.
  background-color: #0F1923;
  padding-right: 30px; // 이미지와의 간격을 위한 오른쪽 패딩
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 섹션의 하단에 내용을 정렬합니다.
  align-items: center;       // 내용을 가로축 중앙에 정렬합니다.
  color: white;
  padding-top: 50px;
  padding-bottom: 50px;      // 하단 패딩을 추가하여 버튼이 바닥에 닿지 않게 합니다.
  
`;

const BeginnerInstruction = styled.h2`
  font-size: 100px;
  font-family: 'Black Han Sans', sans-serif; // Assuming 'Black Han Sans' is the correct font name
  color: #00FCCE;
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
`;

const ImgSection = styled.section`
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



// 컴포넌트 정의...
const Guide = () => {
  const navigate = useNavigate();

  const handleGuideButtonClick = () => {
    console.log("Guide Button clicked!")
    navigate('/guide');
  }

  return (
    <>
      <GuideTopImg>
        {/* ... Content that should be inside GuideTopImg ... */}
      </GuideTopImg>
      <GuidItemContainer>
        <BeginnerInstruction>초보자 가이드</BeginnerInstruction>
        {/* ... Additional content for GuidItemContainer if needed ... */}
      </GuidItemContainer>
      {/* ... Any other components or HTML elements that should be rendered ... */}
    </>
  );
};

export default Guide;
