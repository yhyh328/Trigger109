import GunShot from './audios/GunShot.wav';
import GunLoad from './audios/GunLoad.wav';

export const playGunShot = (volume = 1.0) => {
    const audioGunShot = new Audio(GunShot);
    audioGunShot.loop = false;
    audioGunShot.volume = volume;  
    audioGunShot.play();
};

export const playGunLoad = (volume = 0.5) => {
    const audioGunLoad = new Audio(GunLoad);
    audioGunLoad.muted = true;
    audioGunLoad.muted = false;
    audioGunLoad.loop = false;
    audioGunLoad.volume = volume; 
    audioGunLoad.play();
}
