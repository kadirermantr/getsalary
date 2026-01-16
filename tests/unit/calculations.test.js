import { describe, it, expect } from 'vitest';
import {
  calculateMedian,
  calculateAverage,
  calculatePercentile,
  calculateStdDev,
  calculateGrowthRate,
  calculateMinWageMultiplier,
  adjustForInflation,
  groupAndCalculateStats,
  filterData,
  formatSalary,
  formatNumber,
  formatPercentage,
} from '../../src/utils/calculations';

describe('calculateMedian', () => {
  it('should return 0 for empty array', () => {
    expect(calculateMedian([])).toBe(0);
  });

  it('should return 0 for null/undefined', () => {
    expect(calculateMedian(null)).toBe(0);
    expect(calculateMedian(undefined)).toBe(0);
  });

  it('should return correct median for odd length array', () => {
    expect(calculateMedian([1, 2, 3])).toBe(2);
    expect(calculateMedian([1, 5, 10])).toBe(5);
  });

  it('should return correct median for even length array', () => {
    expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
    expect(calculateMedian([10, 20])).toBe(15);
  });

  it('should handle unsorted arrays', () => {
    expect(calculateMedian([3, 1, 2])).toBe(2);
    expect(calculateMedian([50000, 30000, 80000, 40000])).toBe(45000);
  });
});

describe('calculateAverage', () => {
  it('should return 0 for empty array', () => {
    expect(calculateAverage([])).toBe(0);
  });

  it('should return correct average', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
    expect(calculateAverage([10, 20, 30])).toBe(20);
    expect(calculateAverage([50000, 60000, 70000])).toBe(60000);
  });
});

describe('calculatePercentile', () => {
  it('should return 0 for empty array', () => {
    expect(calculatePercentile([], 50)).toBe(0);
  });

  it('should return correct 25th percentile', () => {
    const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    // Using linear interpolation formula
    expect(calculatePercentile(arr, 25)).toBeCloseTo(32.5, 1);
  });

  it('should return correct 75th percentile', () => {
    const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    // Using linear interpolation formula
    expect(calculatePercentile(arr, 75)).toBeCloseTo(77.5, 1);
  });

  it('should return min for 0th percentile', () => {
    expect(calculatePercentile([10, 20, 30], 0)).toBe(10);
  });

  it('should return max for 100th percentile', () => {
    expect(calculatePercentile([10, 20, 30], 100)).toBe(30);
  });
});

describe('calculateStdDev', () => {
  it('should return 0 for empty array', () => {
    expect(calculateStdDev([])).toBe(0);
  });

  it('should return 0 for single element', () => {
    expect(calculateStdDev([50000])).toBe(0);
  });

  it('should return correct standard deviation', () => {
    const result = calculateStdDev([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(result).toBeCloseTo(2, 0);
  });
});

describe('calculateGrowthRate', () => {
  it('should return 0 when previous is 0', () => {
    expect(calculateGrowthRate(100, 0)).toBe(0);
  });

  it('should return 0 when previous is null', () => {
    expect(calculateGrowthRate(100, null)).toBe(0);
  });

  it('should calculate positive growth correctly', () => {
    expect(calculateGrowthRate(120, 100)).toBe(20);
    expect(calculateGrowthRate(200, 100)).toBe(100);
  });

  it('should calculate negative growth correctly', () => {
    expect(calculateGrowthRate(80, 100)).toBe(-20);
    expect(calculateGrowthRate(50, 100)).toBe(-50);
  });
});

describe('calculateMinWageMultiplier', () => {
  it('should return 0 when minWage is 0', () => {
    expect(calculateMinWageMultiplier(50000, 0)).toBe(0);
  });

  it('should calculate multiplier correctly', () => {
    expect(calculateMinWageMultiplier(50000, 10000)).toBe(5);
    expect(calculateMinWageMultiplier(22500, 22500)).toBe(1);
    expect(calculateMinWageMultiplier(90000, 22500)).toBe(4);
  });
});

describe('adjustForInflation', () => {
  it('should adjust salary for inflation correctly', () => {
    // 65% inflation
    expect(adjustForInflation(165000, 0.65)).toBe(100000);
  });

  it('should handle 0% inflation', () => {
    expect(adjustForInflation(50000, 0)).toBe(50000);
  });
});

describe('groupAndCalculateStats', () => {
  it('should group data and calculate statistics', () => {
    const data = [
      { position: 'backend', salary: 50000 },
      { position: 'backend', salary: 60000 },
      { position: 'frontend', salary: 45000 },
      { position: 'frontend', salary: 55000 },
    ];

    const result = groupAndCalculateStats(data, 'position', 'salary');

    expect(result.backend.count).toBe(2);
    expect(result.backend.median).toBe(55000);
    expect(result.backend.average).toBe(55000);
    expect(result.frontend.count).toBe(2);
    expect(result.frontend.median).toBe(50000);
  });

  it('should handle empty data', () => {
    const result = groupAndCalculateStats([], 'position', 'salary');
    expect(Object.keys(result)).toHaveLength(0);
  });
});

describe('filterData', () => {
  const data = [
    { position: 'backend', city: 'istanbul', salary: 50000 },
    { position: 'backend', city: 'ankara', salary: 45000 },
    { position: 'frontend', city: 'istanbul', salary: 48000 },
    { position: 'frontend', city: 'izmir', salary: 42000 },
  ];

  it('should filter by single criterion', () => {
    const result = filterData(data, { position: 'backend' });
    expect(result).toHaveLength(2);
  });

  it('should filter by multiple criteria', () => {
    const result = filterData(data, { position: 'backend', city: 'istanbul' });
    expect(result).toHaveLength(1);
    expect(result[0].salary).toBe(50000);
  });

  it('should return all data when filter is "all"', () => {
    const result = filterData(data, { position: 'all' });
    expect(result).toHaveLength(4);
  });

  it('should filter by array of values', () => {
    const result = filterData(data, { city: ['istanbul', 'ankara'] });
    expect(result).toHaveLength(3);
  });
});

describe('formatSalary', () => {
  it('should format salary with Turkish locale', () => {
    const result = formatSalary(50000);
    expect(result).toContain('50.000');
    // TRY currency can be displayed as ₺ or TL depending on locale
    expect(result.includes('₺') || result.includes('TL') || result.includes('TRY')).toBe(true);
  });

  it('should return dash for invalid values', () => {
    expect(formatSalary(null)).toBe('—');
    expect(formatSalary(undefined)).toBe('—');
    expect(formatSalary(NaN)).toBe('—');
  });
});

describe('formatNumber', () => {
  it('should format number with thousands separator', () => {
    expect(formatNumber(1000)).toBe('1.000');
    expect(formatNumber(1000000)).toBe('1.000.000');
  });

  it('should return dash for invalid values', () => {
    expect(formatNumber(null)).toBe('—');
  });
});

describe('formatPercentage', () => {
  it('should format positive percentage with plus sign', () => {
    expect(formatPercentage(25)).toBe('+25.0%');
    expect(formatPercentage(100.5)).toBe('+100.5%');
  });

  it('should format negative percentage', () => {
    expect(formatPercentage(-15)).toBe('-15.0%');
  });

  it('should respect decimal places', () => {
    expect(formatPercentage(25.678, 2)).toBe('+25.68%');
    expect(formatPercentage(25.678, 0)).toBe('+26%');
  });

  it('should return dash for invalid values', () => {
    expect(formatPercentage(null)).toBe('—');
  });
});
