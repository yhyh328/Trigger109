// SoundContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface SoundContextProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextProps>({
  isSoundEnabled: true,
  toggleSound: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const toggleSound = () => setIsSoundEnabled((prev) => !prev);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};
