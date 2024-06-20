import React from 'react';
import '../styles/PredictionList.css';

interface PredictionListProps {
  predictions: any[];
}

const PredictionList: React.FC<PredictionListProps> = ({ predictions }) => {
  return (
    <div className="predictions-list">
      <h2>Positions du sélecteur d'objets</h2>
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>
            {prediction.class} - {Math.round(prediction.score * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionList;
