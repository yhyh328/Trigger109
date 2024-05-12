import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface SoundContextProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const defaultSoundContext: SoundContextProps = {
  isSoundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled') || 'false'),
  toggleSound: () => {}
};

const SoundContext = createContext<SoundContextProps>(defaultSoundContext);

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(defaultSoundContext.isSoundEnabled);  // Specify boolean type for state

  useEffect(() => {
    localStorage.setItem('isSoundEnabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => {
    const previousState = isSoundEnabled;
    const newState = !previousState;
    setIsSoundEnabled(newState);

    // 조건 체크: 이전 상태가 false였고 새 상태가 true일 때
    if (!previousState && newState) {
      const userResponse = window.confirm("원활한 사운드 이펙트를 즐기기 위해선 웹 브라우저 설정 내 소리를 항상 허용해야 합니다! 설정 페이지로 가볼까요?!");
      if (userResponse) {
        const userAgent = navigator.userAgent;

        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
          // 크롬 사용자인 경우
          window.location.href = 'chrome://settings/content/sound';
        } else if (userAgent.includes("Edg")) {
          // 엣지 사용자인 경우
          window.location.href = 'edge://settings/';
        } else {
          // 크롬이나 엣지가 아닌 경우 기본 처리
          alert("Sorry, your browser is not supported for direct settings access.");
        }
      }
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};
