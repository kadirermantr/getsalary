import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LATEST_YEAR } from '../data/config';

const FilterContext = createContext(undefined);

const initialFilters = {
  year: LATEST_YEAR,
  position: 'all',
  experience: 'all',
  city: 'all',
  workMode: 'all',
  companyType: 'all',
};

const filterKeys = ['year', 'position', 'experience', 'city', 'workMode', 'companyType'];

export function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL or defaults
  const getInitialFilters = () => {
    const urlFilters = { ...initialFilters };
    filterKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        urlFilters[key] = key === 'year' ? parseInt(value, 10) : value;
      }
    });
    return urlFilters;
  };

  const [filters, setFilters] = useState(getInitialFilters);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    filterKeys.forEach((key) => {
      const value = filters[key];
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => key !== 'year' && value !== 'all'
  ).length;

  // Generate shareable URL
  const getShareableUrl = useCallback(() => {
    const params = new URLSearchParams();
    filterKeys.forEach((key) => {
      const value = filters[key];
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        params.set(key, value.toString());
      }
    });
    const queryString = params.toString();
    const baseUrl = `${window.location.origin}/dashboard`;
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }, [filters]);

  const value = {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    getShareableUrl,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
