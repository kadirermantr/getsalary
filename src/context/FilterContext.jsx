import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/tr/dashboard' || location.pathname === '/en/dashboard';
  const prevPathRef = useRef(location.pathname);

  // Always start with default filters
  const [filters, setFilters] = useState(initialFilters);
  const [userInteracted, setUserInteracted] = useState(false);

  // Reset filters when entering dashboard from another page
  useEffect(() => {
    const prevPath = prevPathRef.current;
    const wasDashboard = prevPath === '/dashboard' || prevPath === '/tr/dashboard' || prevPath === '/en/dashboard';

    if (isDashboard && !wasDashboard) {
      // Entering dashboard from another page - reset everything
      setFilters(initialFilters);
      setUserInteracted(false);
      setSearchParams({}, { replace: true });
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname, isDashboard, setSearchParams]);

  // Clear URL params on non-dashboard pages
  useEffect(() => {
    if (!isDashboard && searchParams.toString()) {
      setSearchParams({}, { replace: true });
    }
  }, [isDashboard, searchParams, setSearchParams]);

  // Sync filters to URL only when user has interacted
  useEffect(() => {
    if (!isDashboard || !userInteracted) return;

    const params = new URLSearchParams();
    filterKeys.forEach((key) => {
      const value = filters[key];
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams, isDashboard, userInteracted]);

  const updateFilter = useCallback((key, value) => {
    setUserInteracted(true);
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
