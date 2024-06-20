import React, { useEffect } from 'react';
import '../styles/ObjectDetection.css';

interface Prediction {
  bbox: number[];
  class: string;
  score: number;
}

interface Props {
  predictions: Prediction[];
}

const ObjectDetection: React.FC<Props> = ({ predictions }) => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const video = document.getElementById('video') as HTMLVideoElement;
    const ctx = canvas.getContext('2d');

    if (ctx && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        ctx.strokeStyle = '#999999';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.font = '18px Arial';
        ctx.fillStyle = '#ffffff';
        
        ctx.fillText(
          `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
          x,
          y > 10 ? y - 5 : 10
        );
      });
    }
  }, [predictions]);

  return null;
};

export default ObjectDetection;

