import { useState, useEffect, useRef, cloneElement } from 'react';

export function ChartWrapper({ children, height = 'h-72' }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
      }
    };

    // Initial measurement after a brief delay for layout
    const timer = setTimeout(updateDimensions, 50);

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const isReady = dimensions.width > 0 && dimensions.height > 0;

  return (
    <div ref={containerRef} className={`${height} min-h-0`}>
      {isReady
        ? cloneElement(children, {
            width: dimensions.width,
            height: dimensions.height,
          })
        : null}
    </div>
  );
}
