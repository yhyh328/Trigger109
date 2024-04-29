import React from 'react';
import styled from 'styled-components';


// Section 컴포넌트에 스타일을 적용합니다.
const Section = styled.section`
  height: 90vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 섹션의 하단에 내용을 정렬합니다.
  align-items: center;       // 내용을 가로축 중앙에 정렬합니다.
  color: white;
  padding-bottom: 20px;      // 하단 패딩을 추가하여 버튼이 바닥에 닿지 않게 합니다.
`;

const BeginnerInstruction = styled.h1`
  font-size: 150px;
  color: #FFFFFF;
  margin-top: 0; 
  span {
    color: #00FCCE;
  }
`;

export const GuideSection: React.FC = () => {
  return (
    <Section>
        <BeginnerInstruction>Tri<span>gg</span>er</BeginnerInstruction>
    </Section>
  );
}
