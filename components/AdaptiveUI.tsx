
import React from 'react';
import { ComplexityLevel } from '../types';

interface AdaptiveUIProps {
  level: ComplexityLevel;
  minimal: React.ReactNode;
  balanced: React.ReactNode;
  advanced?: React.ReactNode;
}

const AdaptiveUI: React.FC<AdaptiveUIProps> = ({ level, minimal, balanced, advanced }) => {
  switch (level) {
    case ComplexityLevel.MINIMAL:
      return <div className="animate-fadeIn">{minimal}</div>;
    case ComplexityLevel.ADVANCED:
      return <div className="animate-fadeIn">{advanced || balanced}</div>;
    case ComplexityLevel.BALANCED:
    default:
      return <div className="animate-fadeIn">{balanced}</div>;
  }
};

export default AdaptiveUI;
