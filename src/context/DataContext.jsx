import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DATA_SOURCES, YEARS, LATEST_YEAR } from '../data/config';
import minWageData from '../data/minWage.json';
import {
  calculateMedian,
  calculateAverage,
  calculatePercentile,
  groupAndCalculateStats,
  calculateMinWageMultiplier,
} from '../utils/calculations';

// Import real survey data
import data2021 from '../data/2021.json';
import data2022 from '../data/2022.json';
import data2023 from '../data/2023.json';
import data2024 from '../data/2024.json';
import data2025 from '../data/2025.json';

const DataContext = createContext(undefined);

export function DataProvider({ children }) {
  const [surveyData, setSurveyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all survey data
  useEffect(() => {
    try {
      setLoading(true);

      // Load real survey data
      const realData = {
        2021: data2021,
        2022: data2022,
        2023: data2023,
        2024: data2024,
        2025: data2025,
      };

      setSurveyData(realData);
      console.log('Loaded real survey data:', Object.keys(realData).map(y => `${y}: ${realData[y].length} records`).join(', '));

      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Get minimum wage for a specific year
  const getMinWage = (year, period = 1) => {
    const entry = minWageData.data.find(
      (d) => d.year === year && d.period === period
    );
    return entry?.net || 0;
  };

  // Get latest minimum wage for a year (handles mid-year increases)
  const getLatestMinWage = (year) => {
    const yearEntries = minWageData.data.filter((d) => d.year === year);
    if (yearEntries.length === 0) return 0;
    return yearEntries[yearEntries.length - 1].net;
  };

  // Filter data based on filters (direct value comparison)
  const filterData = (data, filters = {}) => {
    return data.filter((item) => {
      // Position filter
      if (filters.position && filters.position !== 'all') {
        if (item.position !== filters.position) return false;
      }

      // Experience filter
      if (filters.experience && filters.experience !== 'all') {
        if (item.experienceLevel !== filters.experience) return false;
      }

      // City filter
      if (filters.city && filters.city !== 'all') {
        if (item.city !== filters.city) return false;
      }

      // Work mode filter
      if (filters.workMode && filters.workMode !== 'all') {
        if (item.workMode !== filters.workMode) return false;
      }

      return true;
    });
  };

  // Calculate statistics for a specific year with optional filters
  const getYearStats = (year, filters = {}) => {
    const rawData = surveyData[year] || [];
    if (rawData.length === 0) return null;

    const data = filterData(rawData, filters);
    if (data.length === 0) return null;

    const salaries = data.map((d) => d.salary).filter((s) => s > 0);
    const minWage = getLatestMinWage(year);

    const sortedSalaries = [...salaries].sort((a, b) => a - b);

    return {
      year,
      participants: DATA_SOURCES[year]?.participants || rawData.length,
      filteredCount: data.length,
      medianSalary: calculateMedian(salaries),
      median: calculateMedian(salaries),
      averageSalary: calculateAverage(salaries),
      p25: calculatePercentile(salaries, 25),
      p75: calculatePercentile(salaries, 75),
      min: sortedSalaries[0] || 0,
      max: sortedSalaries[sortedSalaries.length - 1] || 0,
      minWage,
      multiplier: calculateMinWageMultiplier(calculateMedian(salaries), minWage),
      byPosition: groupAndCalculateStats(data, 'position', 'salary'),
      byExperience: groupAndCalculateStats(data, 'experienceLevel', 'salary'),
      byCity: groupAndCalculateStats(data, 'city', 'salary'),
      byWorkMode: groupAndCalculateStats(data, 'workMode', 'salary'),
      byCompanyType: groupAndCalculateStats(data, 'companyType', 'salary'),
    };
  };

  // Memoized computed values
  const allYearsStats = useMemo(() => {
    if (Object.keys(surveyData).length === 0) return [];
    return YEARS.map((year) => getYearStats(year)).filter(Boolean);
  }, [surveyData]);

  // Get unique values for filters from all data
  const getUniqueValues = (field) => {
    const allValues = new Set();
    Object.values(surveyData).forEach((yearData) => {
      yearData.forEach((item) => {
        if (item[field]) allValues.add(item[field]);
      });
    });
    return Array.from(allValues).sort();
  };

  const value = {
    surveyData,
    loading,
    error,
    minWageData: minWageData.data,
    getMinWage,
    getLatestMinWage,
    getYearStats,
    allYearsStats,
    getUniqueValues,
    years: YEARS,
    latestYear: LATEST_YEAR,
    dataSources: DATA_SOURCES,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
