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

const DataContext = createContext(undefined);

export function DataProvider({ children }) {
  const [surveyData, setSurveyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all survey data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // For now, we'll use sample data
        // In production, this would load from actual JSON files
        const sampleData = generateSampleData();
        setSurveyData(sampleData);

        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    loadData();
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
    console.log(`Year ${year}: ${rawData.length} raw, ${data.length} filtered`, filters);
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

// Generate sample data for development
// This will be replaced with actual data loading
function generateSampleData() {
  const positions = [
    'Backend Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'DevOps Engineer',
    'Mobile Developer',
    'Data Engineer',
    'QA Engineer',
    'Security Engineer',
    'Engineering Manager',
  ];
  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Remote'];
  const workModes = ['Remote', 'Hybrid', 'Ofis'];
  const companyTypes = ['Startup', 'Corporate', 'Agency', 'Freelance'];
  const experienceLevels = ['Junior', 'Mid-Level', 'Senior'];

  const baseSalaries = {
    2021: { junior: 6000, mid: 10000, senior: 16000 },
    2022: { junior: 9000, mid: 15000, senior: 22000 },
    2023: { junior: 17000, mid: 27000, senior: 40000 },
    2024: { junior: 36000, mid: 55000, senior: 85000 },
    2025: { junior: 48000, mid: 75000, senior: 120000 },
  };

  const data = {};

  YEARS.forEach((year) => {
    const yearData = [];
    const participantCount = DATA_SOURCES[year]?.participants || 1000;

    for (let i = 0; i < participantCount; i++) {
      const expLevel = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
      const expKey = expLevel === 'Junior' ? 'junior' : expLevel === 'Mid-Level' ? 'mid' : 'senior';
      const baseSalary = baseSalaries[year]?.[expKey] || 10000;

      // Add some variance
      const variance = (Math.random() - 0.5) * 0.4; // ±20%
      const salary = Math.round(baseSalary * (1 + variance));

      yearData.push({
        id: `${year}-${i}`,
        year,
        position: positions[Math.floor(Math.random() * positions.length)],
        experienceYears: expLevel === 'Junior' ? Math.random() * 2 : expLevel === 'Mid-Level' ? 2 + Math.random() * 3 : 5 + Math.random() * 10,
        experienceLevel: expLevel,
        salary,
        city: cities[Math.floor(Math.random() * cities.length)],
        workMode: workModes[Math.floor(Math.random() * workModes.length)],
        companyType: companyTypes[Math.floor(Math.random() * companyTypes.length)],
      });
    }

    data[year] = yearData;
    console.log(`Generated ${yearData.length} records for ${year}`);
  });

  return data;
}
