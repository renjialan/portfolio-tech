"use client"

import LightPillar from "./light-pillar"
import Particles from "../Particles"

interface CosmicBackgroundProps {
  className?: string
  // Light pillar settings
  pillarIntensity?: number
  pillarOpacity?: number
  // Particle settings
  particleCount?: number
  particleOpacity?: number
}

export function CosmicBackground({
  className = "",
  pillarIntensity = 0.8,
  pillarOpacity = 0.7,
  particleCount = 200,
  particleOpacity = 1,
}: CosmicBackgroundProps) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Layer 1: Particles in the back */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: particleOpacity,
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <Particles
          particleColors={['#9FFFCB', '#7AE582', '#25A18E']}
          particleCount={particleCount}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          particleHoverFactor={1}
          alphaParticles={false}
          sizeRandomness={1}
          disableRotation={false}
          cameraDistance={20}
          className=""
        />
      </div>

      {/* Layer 2: Light pillars on top */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ opacity: pillarOpacity }}
      >
        <LightPillar
          topColor="#9FFFCB"
          bottomColor="#25A18E"
          intensity={pillarIntensity}
          rotationSpeed={0.15}
          glowAmount={0.006}
          pillarWidth={3.5}
          pillarHeight={0.25}
          noiseIntensity={0.2}
          mixBlendMode="screen"
        />
      </div>
    </div>
  )
}
