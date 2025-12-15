"use client"

import GradualBlur from "@/components/GradualBlur"

export function StickyBottomBlur() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none" style={{ height: '150px', zIndex: 99999 }}>
      <GradualBlur
        position="bottom"
        height="150px"
        strength={4}
        divCount={10}
        exponential={true}
        curve="bezier"
        animated={false}
        opacity={1}
        gpuOptimized={true}
      />
    </div>
  )
}
