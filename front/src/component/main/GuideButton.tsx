import React from 'react';
import './GuideButton.css';  // 스타일 파일 임포트

interface GuideButtonProps {
  label: string;
  onClick: () => void;  // 클릭 이벤트 핸들러 추가
}

const GuideButton: React.FC<GuideButtonProps> = ({ label, onClick }) => {
  return (
    <div className="guide-btn" onClick={onClick}>
      <span className="underlay">
        <span className="label">{label}</span>
      </span>
    </div>
  );
};

export default GuideButton;

// 이 컴포넌트를 다른 곳에서 사용할 때는 다음과 같이 사용합니다:
// <GuideButton label="Click Here" onClick={() => console.log("Button clicked!")} />
