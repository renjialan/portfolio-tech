import { CSSProperties, ReactNode } from 'react';

export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Curve = 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
export type Target = 'parent' | 'page';
export type AnimatedType = boolean | 'scroll';

export type Preset =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'subtle'
  | 'intense'
  | 'smooth'
  | 'sharp'
  | 'header'
  | 'footer'
  | 'sidebar'
  | 'page-header'
  | 'page-footer';

export interface GradualBlurProps {
  position?: Position;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: AnimatedType;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: Curve;
  responsive?: boolean;
  target?: Target;
  className?: string;
  style?: CSSProperties;
  preset?: Preset;
  hoverIntensity?: number;
  onAnimationComplete?: () => void;

  // Responsive props
  mobileHeight?: string;
  mobileWidth?: string;
  tabletHeight?: string;
  tabletWidth?: string;
  desktopHeight?: string;
  desktopWidth?: string;
}

export interface GradualBlurComponent extends React.NamedExoticComponent<GradualBlurProps> {
  PRESETS: Record<Preset, Partial<GradualBlurProps>>;
  CURVE_FUNCTIONS: Record<Curve, (p: number) => number>;
}

declare const GradualBlur: GradualBlurComponent;

export default GradualBlur;
