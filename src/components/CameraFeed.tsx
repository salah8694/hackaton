import React, { useEffect } from 'react';
import '../styles/CameraFeed.css';

const CameraFeed: React.FC = () => {
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('video') as HTMLVideoElement;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      } catch (error) {
        console.error('Error accessing the camera', error);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="camera-container">
      <video id="video" autoPlay playsInline muted></video>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default CameraFeed;



