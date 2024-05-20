import React from 'react';
import styled from 'styled-components';

type GuideSectionProps = {
  id: string;
  image: string;
  description: string;
};

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  
  img {
    width: 100%;  // 이미지의 폭을 조절
    max-width: 1000px;  // 최대 폭 설정
    height: auto;  // 이미지 높이를 자동으로 조절하여 비율 유지
    border-radius: 8px;  // 이미지에 둥근 모서리 적용
  }

  .product-content {
    text-align: center;
    margin-top: 10px;
  }
`;

export default function GuideSection({
  id,
  image,
  description,
}: GuideSectionProps) {
  return (
    <StyledArticle>
      <img src={image} alt="Guide Visual" />
      <div className="product-content">
        <p>{description}</p>
      </div>
    </StyledArticle>
  );
}
