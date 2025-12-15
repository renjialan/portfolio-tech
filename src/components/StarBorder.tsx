"use client"

import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
};

const keyframesStyle = `
  @keyframes star-movement-bottom {
    0% { transform: translate(0%, 0%); opacity: 1; }
    100% { transform: translate(-100%, 0%); opacity: 0; }
  }
  @keyframes star-movement-top {
    0% { transform: translate(0%, 0%); opacity: 1; }
    100% { transform: translate(100%, 0%); opacity: 0; }
  }
`;

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#7AE582',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
      <Component
        className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
        {...(rest as any)}
        style={{
          padding: `${thickness}px 0`,
          ...(rest as any).style
        }}
      >
        <div
          className="absolute w-[300%] h-[50%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animation: `star-movement-bottom ${speed} linear infinite alternate`,
            opacity: 0.7,
            bottom: '-11px',
            right: '-250%',
            zIndex: 0
          }}
        />
        <div
          className="absolute w-[300%] h-[50%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animation: `star-movement-top ${speed} linear infinite alternate`,
            opacity: 0.7,
            top: '-10px',
            left: '-250%',
            zIndex: 0
          }}
        />
        <div
          className="relative text-white text-center py-4 px-6 rounded-[20px]"
          style={{
            zIndex: 1,
            background: 'linear-gradient(to bottom, rgb(8, 8, 12), rgb(12, 12, 16))',
            border: '1px solid rgba(122, 229, 130, 0.3)'
          }}
        >
          {children}
        </div>
      </Component>
    </>
  );
};

export default StarBorder;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
//         'star-movement-top': 'star-movement-top linear infinite alternate',
//       },
//       keyframes: {
//         'star-movement-bottom': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
//         },
//         'star-movement-top': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
//         },
//       },
//     },
//   }
// }
