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

  const toggleSound = () => setIsSoundEnabled((prev: boolean) => !prev);  // Specify the type of `prev` as boolean

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};
