import GunShot from './GunShot.wav';
import GunLoad from './GunLoad.wav';
import Plasma from './plasma-blast.wav';
import Zap from './zap.wav';


// Prepare the gunshot audio
export const prepareGunShot = (volume = 1.0) => {
  const audioGunShot = new Audio(GunShot);
  audioGunShot.loop = false;
  audioGunShot.volume = volume;
  return audioGunShot;
};

// Prepare the gunload audio
export const prepareGunLoad = (volume = 0.5) => {
  const audioGunLoad = new Audio(GunLoad);
  audioGunLoad.loop = false;
  audioGunLoad.volume = volume;
  return audioGunLoad;
};

export const preparePlasma = (volume = 1.0) => {
  const audioPlasma = new Audio(Plasma)
  audioPlasma.loop = false;
  audioPlasma.volume = volume;
  return audioPlasma
}

export const prepareZap = (volume = 1.0) => {
  const audioZap = new Audio(Zap)
  audioZap.loop = false;
  audioZap.volume = volume;
  return audioZap
}