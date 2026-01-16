import { ResponsiveContainer } from 'recharts';

export function ChartContainer({ children, height = 300, className = '' }) {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
