'use client';

import GradualBlur from '@/components/GradualBlur';

/**
 * GradualBlur Component Demo
 *
 * Examples of how to use the GradualBlur component with the Funstuff design system.
 * This component creates a progressive blur effect at the edges of containers.
 */

export function GradualBlurDemo() {
  return (
    <div className="space-y-12 p-8">
      {/* Example 1: Hero Section with Bottom Blur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">1. Hero Section - Bottom Blur</h2>
        <div style={{ position: 'relative', height: 500, overflow: 'hidden' }} className="card-luxury">
          <div style={{ height: '100%', overflowY: 'auto', padding: '3rem 2rem' }}>
            <h1 className="text-4xl font-bold text-gradient-green mb-4">Welcome to Funstuff</h1>
            <p className="text-text-secondary mb-4">
              This section demonstrates a bottom blur effect. Scroll down to see the blur in action.
            </p>
            {/* Add more content to enable scrolling */}
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i} className="text-text-muted mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scroll to see the gradual blur effect at the bottom.
              </p>
            ))}
          </div>

          <GradualBlur
            target="parent"
            position="bottom"
            height="8rem"
            strength={2.5}
            divCount={5}
            curve="bezier"
            exponential={true}
            opacity={1}
          />
        </div>
      </section>

      {/* Example 2: Using Presets */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">2. Using Presets - Header Style</h2>
        <div style={{ position: 'relative', height: 400 }} className="card-luxury">
          <div style={{ padding: '2rem', overflowY: 'auto', height: '100%' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <p key={i} className="text-text-secondary mb-3">
                This example uses the "header" preset for a top blur effect. Perfect for headers or navigation areas.
              </p>
            ))}
          </div>
          <GradualBlur preset="header" />
        </div>
      </section>

      {/* Example 3: Subtle Footer Blur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">3. Subtle Footer Effect</h2>
        <div style={{ position: 'relative', height: 300 }} className="glass-green">
          <div style={{ padding: '2rem', overflowY: 'auto', height: '100%' }}>
            <h3 className="text-xl font-semibold mb-4">Content Section</h3>
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="text-text-secondary mb-3">
                Using the "subtle" preset for a gentle blur effect at the footer.
              </p>
            ))}
          </div>
          <GradualBlur
            preset="subtle"
            position="bottom"
            className="opacity-80"
          />
        </div>
      </section>

      {/* Example 4: Intense Blur with Green Glow Theme */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">4. Intense Blur Effect</h2>
        <div style={{ position: 'relative', height: 400 }} className="cyber-border glass-dark">
          <div style={{ padding: '2rem', overflowY: 'auto', height: '100%' }}>
            <h3 className="text-xl font-semibold cyber-glow mb-4">High-Tech Section</h3>
            {Array.from({ length: 6 }).map((_, i) => (
              <p key={i} className="text-text-secondary mb-3">
                This uses an "intense" preset with exponential curve for a dramatic effect.
              </p>
            ))}
          </div>
          <GradualBlur
            preset="intense"
            position="bottom"
            curve="ease-out"
          />
        </div>
      </section>

      {/* Example 5: Smooth Bezier Curve */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">5. Smooth Bezier Curve</h2>
        <div style={{ position: 'relative', height: 350 }} className="gradient-animated rounded-lg">
          <div style={{ padding: '2rem', overflowY: 'auto', height: '100%' }} className="glass">
            <h3 className="text-xl font-semibold mb-4">Animated Background</h3>
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="text-text-primary mb-3">
                Smooth bezier curve creates a natural blur transition.
              </p>
            ))}
          </div>
          <GradualBlur
            preset="smooth"
            position="bottom"
          />
        </div>
      </section>

      {/* Example 6: Custom Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">6. Custom Configuration</h2>
        <div style={{ position: 'relative', height: 400 }} className="card-luxury">
          <div style={{ padding: '2rem', overflowY: 'auto', height: '100%' }}>
            <h3 className="text-xl font-semibold glow-green-subtle mb-4">Custom Settings</h3>
            {Array.from({ length: 7 }).map((_, i) => (
              <p key={i} className="text-text-secondary mb-3">
                Fully customized blur with specific height, strength, and curve settings.
              </p>
            ))}
          </div>
          <GradualBlur
            position="bottom"
            height="10rem"
            strength={3}
            divCount={8}
            curve="ease-in-out"
            exponential={false}
            opacity={0.95}
          />
        </div>
      </section>

      {/* Example 7: Left/Right Blur for Sidebars */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient-green">7. Sidebar Blur (Right Side)</h2>
        <div style={{ position: 'relative', width: '100%', height: 300 }} className="glass-dark rounded-lg">
          <div style={{ padding: '2rem', overflowX: 'auto', height: '100%', display: 'flex', gap: '2rem' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="min-w-[200px] card-luxury p-4">
                <p className="text-text-secondary">Card {i + 1}</p>
              </div>
            ))}
          </div>
          <GradualBlur
            position="right"
            height="8rem"
            strength={2}
            divCount={6}
            curve="bezier"
          />
        </div>
      </section>
    </div>
  );
}

// Export individual examples for use in other components
export const HeroBlurExample = () => (
  <div style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
    <div style={{ height: '100%', overflowY: 'auto', padding: '6rem 2rem' }}>
      {/* Your content here */}
      <h1 className="text-4xl font-bold text-gradient-green">Your Content</h1>
    </div>
    <GradualBlur
      target="parent"
      position="bottom"
      height="6rem"
      strength={2}
      divCount={5}
      curve="bezier"
      exponential={true}
      opacity={1}
    />
  </div>
);

export default GradualBlurDemo;
