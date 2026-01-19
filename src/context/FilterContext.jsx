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

// Known filter values for reverse URL mapping
const knownValues = {
  position: ['Backend Developer', 'Frontend Developer', 'Fullstack Developer', 'Mobile Developer', 'DevOps Engineer', 'Data/AI Engineer', 'QA Engineer', 'Security Engineer', 'Embedded Developer', 'Game Developer', 'Software Engineer', 'Software Architect', 'System/DB Admin', 'SAP/ERP Developer', 'Engineering Manager', 'Product/Project Manager', 'Team/Tech Lead', 'Agile Coach', 'Business Analyst', 'UI/UX Designer', 'Consultant/Support', 'Diğer'],
  experience: ['Junior', 'Mid-Level', 'Senior'],
  city: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Yurtdışı', 'Diğer'],
  workMode: ['Remote', 'Hybrid', 'Ofis'],
  companyType: ['Startup', 'Corporate', 'Agency', 'Freelance'],
};

// Convert URL-friendly value back to actual value
const fromUrlValue = (urlValue, key) => {
  if (!urlValue || urlValue === 'all') return 'all';
  if (key === 'year') return parseInt(urlValue, 10) || LATEST_YEAR;

  const values = knownValues[key];
  if (!values) return urlValue;

  // Find matching value (case-insensitive, handle / to - conversion)
  const normalizedUrl = urlValue.toLowerCase();
  const match = values.find(v => v.toLowerCase().replace(/\//g, '-') === normalizedUrl);
  return match || 'all';
};

export function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/tr/dashboard' || location.pathname === '/en/dashboard';
  const initializedFromUrl = useRef(false);

  // Always start with default filters
  const [filters, setFilters] = useState(initialFilters);
  const [userInteracted, setUserInteracted] = useState(false);

  // Initialize filters from URL on first mount
  useEffect(() => {
    if (!isDashboard || initializedFromUrl.current) return;

    const hasParams = filterKeys.some(key => searchParams.has(key.toLowerCase()));
    if (hasParams) {
      const newFilters = { ...initialFilters };
      filterKeys.forEach(key => {
        const urlValue = searchParams.get(key.toLowerCase());
        if (urlValue) {
          newFilters[key] = fromUrlValue(urlValue, key);
        }
      });
      setFilters(newFilters);
      initializedFromUrl.current = true;
    }
  }, [isDashboard, searchParams]);

  // Reset filters when leaving dashboard
  useEffect(() => {
    if (!isDashboard) {
      // Not on dashboard - reset everything
      setFilters(initialFilters);
      setUserInteracted(false);
      initializedFromUrl.current = false;
      if (searchParams.toString()) {
        setSearchParams({}, { replace: true });
      }
    }
  }, [isDashboard, setSearchParams, searchParams]);

  // Convert value to URL-friendly format
  const toUrlValue = (value) => {
    return value.toString().toLowerCase().replace(/\//g, '-');
  };

  // Sync filters to URL only when user has interacted (lowercase URLs)
  useEffect(() => {
    if (!isDashboard || !userInteracted) return;

    const params = new URLSearchParams();
    filterKeys.forEach((key) => {
      const value = filters[key];
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        params.set(key.toLowerCase(), toUrlValue(value));
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

  // Generate shareable URL (lowercase, URL-friendly)
  const getShareableUrl = useCallback(() => {
    const params = new URLSearchParams();
    filterKeys.forEach((key) => {
      const value = filters[key];
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        params.set(key.toLowerCase(), toUrlValue(value));
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
