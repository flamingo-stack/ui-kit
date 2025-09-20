'use client';

import React, { useEffect, useRef, useState } from 'react';

type ProgressBarProps = {
  progress: number; // 0–100
  warningThreshold?: number; // default 70
  criticalThreshold?: number; // default 90
  segmentWidth?: number; // px, default 6
  segmentGap?: number; // px, default 2
  height?: number; // px, default 16
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  warningThreshold = 75,
  criticalThreshold = 90,
  segmentWidth = 6,
  segmentGap = 2,
  height = 16,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [segmentCount, setSegmentCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const count = Math.floor(width / (segmentWidth + segmentGap));
        setSegmentCount(count);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [segmentWidth, segmentGap]);

  // Pick color based on thresholds
  const getColor = () => {
    if (progress >= criticalThreshold) return "#F36666"; // critical red
    if (progress >= warningThreshold) return "#E1B32F"; // warning yellow
    return "#5EA62E"; // base green
  };

  return (
    <div ref={containerRef} className="w-full flex gap-[2px]">
      {Array.from({ length: segmentCount }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm"
          style={{
            width: `${segmentWidth}px`,
            height: `${height}px`,
            backgroundColor:
              i < Math.round((progress / 100) * segmentCount)
                ? getColor()
                : "#4B5563", // gray-600
          }}
        />
      ))}
    </div>
  );
};
