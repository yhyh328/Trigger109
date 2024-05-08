import React, { useState, useEffect, useRef } from 'react';
import VideoCall from '../../helpers/simple-peer';
import '../../styles/video.css';
import io from 'socket.io-client';
import { getDisplayStream } from '../../helpers/media-access';
import { ShareScreenIcon, MicOnIcon, MicOffIcon, CamOnIcon, CamOffIcon } from './Icons';
import { useParams } from 'react-router-dom';

const Video = () => {
  const [localStream, setLocalStream] = useState({});
  const [screenStream, setScreenStream] = useState({});
  const [remoteStreamUrl, setRemoteStreamUrl] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [initiator, setInitiator] = useState(false);
  const [peer, setPeer] = useState({});
  const [full, setFull] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [micState, setMicState] = useState(true);
  const [camState, setCamState] = useState(true);
  const webcamVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const { roomId } = useParams();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SIGNALING_SERVER);
    console.log("REACT_APP_SIGNALING_SERVER", process.env.REACT_APP_SIGNALING_SERVER);
    const configuration = {
      iceServers: [
        { urls: process.env.REACT_APP_STUN_SERVERS },
        { urls: process.env.REACT_APP_TURN_SERVERS, username: process.env.REACT_APP_TURN_USERNAME, credential: process.env.REACT_APP_TURN_CREDENTIAL }
      ]
    };
    const peerConnection = new RTCPeerConnection(configuration);
    setPeer(peerConnection);

    getUserMedia().then(() => {
      socket.current.emit('join', { roomId });
    });

    socket.current.on('init', () => setInitiator(true));
    socket.current.on('ready', () => enter(roomId));
    socket.current.on('desc', data => handleCall(data));
    socket.current.on('disconnected', () => setInitiator(true));
    socket.current.on('full', () => setFull(true));

    return () => {
      socket.current.disconnect();
    };
  }, [roomId]);



  const getUserMedia = async () => {
    const op = {
      video: { width: { min: 160, ideal: 640, max: 1280 }, height: { min: 120, ideal: 360, max: 720 } },
      audio: true
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(op);
      webcamVideoRef.current.srcObject = stream;
      setLocalStream(stream);
      setStreamUrl(stream);
    } catch (error) {
      console.log('Error accessing media devices.', error);
    }
  };

  const setAudioLocal = () => {
    if (localStream.getAudioTracks().length > 0) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setMicState(!micState);
  };

  const setVideoLocal = () => {
    if (localStream.getVideoTracks().length > 0) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setCamState(!camState);
  };

  const getDisplay = async () => {
    try {
        const stream = await getDisplayStream();
        screenVideoRef.current.srcObject = stream;
        setScreenStream(stream);
        stream.getTracks().forEach(track => {
            peer.addTrack(track, stream);
        });
  
        stream.oninactive = () => {
            screenVideoRef.current.srcObject = null;
            setScreenStream({});
        };
    } catch (error) {
        console.error('Failed to get display stream:', error);
        // 추가적인 에러 처리 로직
    }
  };
  


  const enter = (roomId) => {
    setConnecting(true);
    const videoCall = new VideoCall();
    const newPeer = videoCall.init(localStream, initiator);
    setPeer(newPeer);

    newPeer.on('signal', data => {
      const signal = { room: roomId, desc: data };
      socket.current.emit('signal', signal);
    });

    newPeer.on('stream', stream => {
      remoteVideoRef.current.srcObject = stream;
      setConnecting(false);
      setWaiting(false);
    });

    newPeer.on('error', function(err) {
      console.log(err);
    });
  };

  const handleCall = (data) => {
    if ((data.type === 'offer' && initiator) || (data.type === 'answer' && !initiator)) return;
    const videoCall = new VideoCall();
    videoCall.connect(data);
  };

  const renderFull = () => {
    if (full) {
      return 'The room is full';
    }
  };

  return (
    <div className='video-wrapper'>
      <div className='local-video-wrapper'>
        <video autoPlay id='webcamVideo' muted ref={webcamVideoRef} />
      </div>
      {connecting && (
        <div className='status'>
          <p>Establishing connection...</p>
        </div>
      )}
      {waiting && (
        <div className='status'>
          <p>Waiting for someone...</p>
          <video autoPlay id='screenVideo' ref={screenVideoRef} style={{ width: '100%' }} />
        </div>
      )}
      <video autoPlay className={`${connecting || waiting ? 'hide' : ''}`} id='remoteVideo' ref={remoteVideoRef} />
      <div className='controls'>
        <button className='control-btn' onClick={getDisplay}><ShareScreenIcon /></button>
        <button className='control-btn' onClick={setAudioLocal}>{micState ? <MicOnIcon /> : <MicOffIcon />}</button>
        <button className='control-btn' onClick={setVideoLocal}>{camState ? <CamOnIcon /> : <CamOffIcon />}</button>
      </div>
      {renderFull()}
    </div>
  );
};

export default Video;
