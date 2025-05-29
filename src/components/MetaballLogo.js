import React from 'react';
import '../styles/Navigation.css'; // CSS 파일 import

const MetaballLogo = () => {
  return (
    <div className="svg-container">
      <svg
        className="svg-circle"
        viewBox="0 0 240 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="circle">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="circle"
            />
            <feComposite in="SourceGraphic" in2="circle" operator="atop" />
          </filter>
        </defs>

        <g filter="url(#circle)">
          <circle cx="60" cy="50" r="20" fill="black">
            <animate attributeName="cx" values="20;30;20" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="50" r="20" fill="black">
            <animate attributeName="cx" values="70;60;70" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="50" r="20" fill="black">
            <animate attributeName="cx" values="120;120;120" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="50" r="20" fill="black">
            <animate attributeName="cx" values="170;180;170" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="50" r="20" fill="black">
            <animate attributeName="cx" values="220;210;220" dur="5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default MetaballLogo;