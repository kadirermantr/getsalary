import { useState, useEffect, useRef } from 'react';

export function AnimatedCounter({
  value,
  duration = 2000,
  formatter = (val) => val.toLocaleString(),
  className = '',
}) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = safeValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValue + (endValue - startValue) * easeOut;
      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [safeValue, duration]);

  return <span className={className}>{formatter(displayValue)}</span>;
}

export function AnimatedSalary({ value, className = '', locale = 'tr' }) {
  const isTurkish = locale === 'tr' || locale === 'tr-TR';
  const localeCode = isTurkish ? 'tr-TR' : 'en-US';
  const safeValue = Number.isFinite(value) ? value : 0;

  return (
    <AnimatedCounter
      value={safeValue}
      formatter={(val) => {
        const formattedNumber = val.toLocaleString(localeCode);
        return isTurkish ? `${formattedNumber} ₺` : `₺${formattedNumber}`;
      }}
      className={className}
    />
  );
}

export function AnimatedMultiplier({ value, className = '' }) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = safeValue;
    const startTime = performance.now();
    const duration = 2000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [safeValue]);

  return <span className={className}>{displayValue.toFixed(1)}x</span>;
}
