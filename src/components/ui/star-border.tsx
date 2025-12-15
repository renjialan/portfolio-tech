"use client"

import React, { type ElementType } from 'react';
import './star-border.css';

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
}

function StarBorder({
  as: Component = 'button',
  className = '',
  color = '#7AE582',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) {
  const containerStyle: React.CSSProperties = {
    padding: `${thickness}px`,
    borderRadius: '0.5rem',
    ...style
  };

  const gradientStyle: React.CSSProperties = {
    background: `radial-gradient(circle, ${color}, transparent 10%)`,
    animationDuration: speed
  };

  return (
    <div
      className={`star-border-container ${className}`}
      style={containerStyle}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      <div className="border-gradient-bottom" style={gradientStyle} />
      <div className="border-gradient-top" style={gradientStyle} />
      <div className="inner-content">{children}</div>
    </div>
  );
}

export default StarBorder;
