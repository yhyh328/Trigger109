import React from 'react';
import './ValorantButton.css';  // 스타일 파일 임포트

interface ValorantButtonProps {
  label: string;
  onClick: () => void;  // 클릭 이벤트 핸들러 추가
  onMouseEnter: () => void;
}

const ValorantButton: React.FC<ValorantButtonProps> = ({ label, onClick }) => {
  return (
    <div className="valorant-btn" onClick={onClick}>
      <span className="underlay">
        <span className="label">{label}</span>
      </span>
    </div>
  );
};

export default ValorantButton;

// 이 컴포넌트를 다른 곳에서 사용할 때는 다음과 같이 사용합니다:
// <ValorantButton label="Click Here" onClick={() => console.log("Button clicked!")} />
