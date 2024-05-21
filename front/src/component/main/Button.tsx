import React from 'react';
import ReactDOM from 'react-dom';
import './Button.css';  // 스타일 파일 임포트

interface ButtonProps {
  label: string;
  onMouseEnter: () => void;
  onClick: () => void;  // 클릭 이벤트 핸들러 추가
}

const Button: React.FC<ButtonProps> = ({ label, onClick, onMouseEnter }) => {
  return (
    <div className="btn" onClick={onClick} onMouseEnter={onMouseEnter}>
      <span className="underlay">
        <span className="label">{label}</span>
      </span>
    </div>
  );
};


export default Button;

// 이 컴포넌트를 다른 곳에서 사용할 때는 다음과 같이 사용합니다:
// <Button label="Click Here" onClick={() => console.log("Button clicked!")} />
