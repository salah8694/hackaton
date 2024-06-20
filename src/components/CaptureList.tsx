import React from 'react';
import '../styles/CaptureList.css';

interface CaptureListProps {
  captures: string[];
}

const CaptureList: React.FC<CaptureListProps> = ({ captures }) => {
  return (
    <div className="captures-list">
      <h2>Liste de capture d'Images</h2>
      <div className="captures-container">
        {captures.map((capture, index) => (
          <img key={index} src={capture} alt={`Capture ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CaptureList;
