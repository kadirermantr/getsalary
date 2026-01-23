/**
 * Calculate median value from an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} Median value
 */
export function calculateMedian(arr) {
  if (!arr || arr.length === 0) return 0;

  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Calculate average value from an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} Average value
 */
export function calculateAverage(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculate percentile value
 * @param {number[]} arr - Array of numbers
 * @param {number} p - Percentile (0-100)
 * @returns {number} Percentile value
 */
export function calculatePercentile(arr, p) {
  if (!arr || arr.length === 0) return 0;

  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  if (upper >= sorted.length) return sorted[sorted.length - 1];
  if (lower === upper) return sorted[lower];

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * Calculate standard deviation
 * @param {number[]} arr - Array of numbers
 * @returns {number} Standard deviation
 */
export function calculateStdDev(arr) {
  if (!arr || arr.length === 0) return 0;

  const avg = calculateAverage(arr);
  const squareDiffs = arr.map((value) => Math.pow(value - avg, 2));
  const avgSquareDiff = calculateAverage(squareDiffs);

  return Math.sqrt(avgSquareDiff);
}

/**
 * Calculate year-over-year growth rate
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Growth rate as percentage
 */
export function calculateGrowthRate(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Calculate minimum wage multiplier
 * @param {number} salary - Salary value
 * @param {number} minWage - Minimum wage value
 * @returns {number} Multiplier (salary / minWage)
 */
export function calculateMinWageMultiplier(salary, minWage) {
  if (!minWage || minWage === 0) return 0;
  return salary / minWage;
}

/**
 * Adjust salary for inflation
 * @param {number} salary - Nominal salary
 * @param {number} inflationRate - Cumulative inflation rate (as decimal, e.g., 0.65 for 65%)
 * @returns {number} Real (inflation-adjusted) salary
 */
export function adjustForInflation(salary, inflationRate) {
  return salary / (1 + inflationRate);
}

/**
 * Group data by a specific key and calculate statistics
 * @param {Object[]} data - Array of data objects
 * @param {string} groupKey - Key to group by
 * @param {string} valueKey - Key for the value to calculate stats on
 * @returns {Object} Grouped statistics
 */
export function groupAndCalculateStats(data, groupKey, valueKey) {
  const groups = {};

  data.forEach((item) => {
    const groupValue = item[groupKey];
    if (!groupValue) return;

    if (!groups[groupValue]) {
      groups[groupValue] = [];
    }
    if (item[valueKey] && !isNaN(item[valueKey])) {
      groups[groupValue].push(Number(item[valueKey]));
    }
  });

  const result = {};
  Object.entries(groups).forEach(([key, values]) => {
    result[key] = {
      count: values.length,
      median: calculateMedian(values),
      average: calculateAverage(values),
      min: Math.min(...values),
      max: Math.max(...values),
      p25: calculatePercentile(values, 25),
      p75: calculatePercentile(values, 75),
      stdDev: calculateStdDev(values),
    };
  });

  return result;
}

/**
 * Filter data by multiple criteria
 * @param {Object[]} data - Array of data objects
 * @param {Object} filters - Filter criteria
 * @returns {Object[]} Filtered data
 */
export function filterData(data, filters) {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'all') return true;
      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }
      return item[key] === value;
    });
  });
}

/**
 * Normalize position names to standard categories
 * @param {string} position - Raw position name
 * @param {Object} positionMap - Position mapping object
 * @returns {string} Normalized position category
 */
export function normalizePosition(position, positionMap) {
  if (!position) return 'other';

  const lowerPosition = position.toLowerCase();

  for (const [category, variations] of Object.entries(positionMap)) {
    if (variations.some((v) => lowerPosition.includes(v.toLowerCase()))) {
      return category;
    }
  }

  return 'other';
}

/**
 * Get experience level from years of experience
 * @param {number} years - Years of experience
 * @param {Object} levelMap - Experience level mapping
 * @returns {string} Experience level category
 */
export function getExperienceLevel(years, levelMap) {
  for (const [level, { min, max }] of Object.entries(levelMap)) {
    if (years >= min && years < max) {
      return level;
    }
  }
  return 'senior';
}

/**
 * Format salary for display
 * @param {number} value - Salary value
 * @param {string} locale - Locale string (tr or en)
 * @returns {string} Formatted salary string
 */
export function formatSalary(value, locale = 'tr') {
  if (!value || isNaN(value)) return '—';

  const isTurkish = locale === 'tr' || locale === 'tr-TR';
  const localeCode = isTurkish ? 'tr-TR' : 'en-US';

  // Format number with thousands separator
  const formattedNumber = new Intl.NumberFormat(localeCode, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  // Turkish format: number + space + symbol (107.500 ₺)
  // English format: symbol + number (₺107,500)
  if (isTurkish) {
    return `${formattedNumber} ₺`;
  }
  return `₺${formattedNumber}`;
}

/**
 * Format number with thousands separator
 * @param {number} value - Number value
 * @param {string} locale - Locale string
 * @returns {string} Formatted number string
 */
export function formatNumber(value, locale = 'tr-TR') {
  if (!value || isNaN(value)) return '—';

  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @param {string} locale - Locale string (tr or en)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, decimals = 1, locale = 'tr') {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const absNum = Math.abs(value).toFixed(decimals);
  const sign = value >= 0 ? '+' : '-';
  // Turkish: +%51.2 or -%51.2, English: +51.2% or -51.2%
  if (locale === 'tr') {
    return `${sign}%${absNum}`;
  }
  return `${sign}${absNum}%`;
}
