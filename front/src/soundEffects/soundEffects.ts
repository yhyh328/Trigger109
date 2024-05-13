import GunShot from './GunShot.wav';
import GunLoad from './GunLoad.wav';

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
