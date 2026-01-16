import { createContext, useContext, useState, useCallback } from 'react';
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

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters);

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

  const value = {
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
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
