import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Section 컴포넌트에 스타일을 적용합니다.
const Section = styled.section`
  height: 90vh;
  background-image: url('/valorant5.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 섹션의 하단에 내용을 정렬합니다.
  align-items: center;       // 내용을 가로축 중앙에 정렬합니다.
  color: white;
  padding-bottom: 20px;      // 하단 패딩을 추가하여 버튼이 바닥에 닿지 않게 합니다.
`;

const MainSection3 = () => {
  const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내에서 호출합니다.

  const handlePlayClick = () => {
    console.log('지금 시청하기')
    navigate('/live');  // 이벤트 핸들러 내에서 navigate 함수를 호출합니다.
  };

  return (
    <Section>
    </Section>
  );
}

export default MainSection3;
