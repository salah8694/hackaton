import React, { useState, useEffect } from 'react';
import CameraFeed from './components/CameraFeed';
import ObjectDetection from './components/ObjectDetection';
import PredictionList from './components/PredictionList';
import CaptureList from './components/CaptureList';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './styles/App.css';

const App: React.FC = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [captures, setCaptures] = useState<string[]>([]);

  const detectObjects = async (video: HTMLVideoElement) => {
    const model = await cocoSsd.load();

    const detectFrame = async () => {
      if (video.readyState === 4) {
        const predictions = await model.detect(video);
        setPredictions(predictions);
      }
      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  useEffect(() => {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        detectObjects(videoElement);
      });
    }

    const savedCaptures = localStorage.getItem('captures');
    if (savedCaptures) {
      setCaptures(JSON.parse(savedCaptures));
    }
  }, []);

  const captureImage = () => {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        const updatedCaptures = [...captures, imageData];
        setCaptures(updatedCaptures);
        localStorage.setItem('captures', JSON.stringify(updatedCaptures));
      }
    }
  };

  return (
    <div className="app">
      <h1>Hackathon 2024 - Application de reconnaissance d'objet</h1>
      
      <div className="content">
        <div className="position">
          <div className="camera-section">
            <CameraFeed />
            <ObjectDetection predictions={predictions} />
          </div>
          <div className="captures-section">
            <PredictionList predictions={predictions} />
            <button onClick={captureImage}>Capturer</button>
            <CaptureList captures={captures} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;




