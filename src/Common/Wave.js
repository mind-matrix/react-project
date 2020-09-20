import React from 'react';
import WaveSVG from '../Assets/wave.svg';
import './Wave.css';

export default function Wave() {
  return (
    <div className="Wave-icon">
      <img src={WaveSVG} alt="Wave" />
    </div>
  );
}