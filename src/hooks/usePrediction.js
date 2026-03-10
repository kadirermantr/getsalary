import { useMemo, useState, useCallback } from 'react';
import predictionModel from '../data/predictionModel.json';
import { predictSalary, applyScenario, calculateConfidenceInterval, buildChartData } from '../utils/prediction';

const DEFAULT_SCENARIO = {
  inflation: 0.30,
  exchangeRate: 0.15,
  sectorGrowth: 0.10,
};

const PRESETS = {
  optimistic: { inflation: 0.20, exchangeRate: 0.05, sectorGrowth: 0.20 },
  normal: { inflation: 0.30, exchangeRate: 0.15, sectorGrowth: 0.10 },
  pessimistic: { inflation: 0.45, exchangeRate: 0.20, sectorGrowth: 0.03 },
};

export function usePrediction() {
  const [scenario, setScenario] = useState(DEFAULT_SCENARIO);
  const [activePreset, setActivePreset] = useState('normal');
  const [profile, setProfile] = useState({ position: 'all', experience: 'all' });

  const updateScenario = useCallback((key, value) => {
    setScenario((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null); // Clear active preset when manually adjusting
  }, []);

  const applyPreset = useCallback((presetName) => {
    if (PRESETS[presetName]) {
      setScenario(PRESETS[presetName]);
      setActivePreset(presetName);
    }
  }, []);

  const updateProfile = useCallback((key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  const model = predictionModel;
  const factors = model.adjustmentFactors;
  const lastTrainingYear = Math.max(...model.metadata.dataYears);

  // Resolve which equation to use based on profile
  const activeModel = useMemo(() => {
    // If both position and experience are selected, prefer position (more specific)
    if (profile.position !== 'all' && model.byPosition[profile.position]) {
      return model.byPosition[profile.position];
    }
    if (profile.experience !== 'all' && model.byExperience[profile.experience]) {
      return model.byExperience[profile.experience];
    }
    return model.overall;
  }, [profile, model]);

  const { equation, rSquared } = activeModel;

  // Find historical medians for active model
  const activeHistoricalMedians = useMemo(() => {
    // For position/experience models we don't have stored historical medians,
    // so we reconstruct from the equation (fitted values for training years)
    if (profile.position === 'all' && profile.experience === 'all') {
      return model.historicalMedians;
    }
    return model.metadata.dataYears.map((year) => ({
      year,
      median: Math.round(predictSalary(year, equation)),
    }));
  }, [profile, model, equation]);

  // Overall predictions with scenario adjustments
  const overallPredictions = useMemo(() => {
    const results = {};
    for (let year = lastTrainingYear + 1; year <= lastTrainingYear + 3; year++) {
      const base = predictSalary(year, equation);
      const adjusted = applyScenario(base, scenario, factors);
      const yearsAhead = year - lastTrainingYear;
      const ci = calculateConfidenceInterval(adjusted, rSquared, yearsAhead);
      results[year] = { base: Math.round(base), adjusted, ...ci };
    }
    return results;
  }, [scenario, equation, rSquared, factors, lastTrainingYear]);

  // Chart data
  const chartData = useMemo(() => {
    const baseData = buildChartData(activeHistoricalMedians, equation, rSquared, 3);

    return baseData.map((point) => {
      if (point.actual !== null) return point;
      const yearsAhead = point.year - lastTrainingYear;
      const adjusted = applyScenario(point.predicted, scenario, factors);
      const ci = calculateConfidenceInterval(adjusted, rSquared, yearsAhead);
      return {
        ...point,
        predicted: adjusted,
        ciLower: ci.lower,
        ciUpper: ci.upper,
      };
    });
  }, [activeHistoricalMedians, scenario, equation, rSquared, factors, lastTrainingYear]);

  // Position predictions
  const positionPredictions = useMemo(() => {
    const results = {};
    for (const [position, data] of Object.entries(model.byPosition)) {
      const base = predictSalary(lastTrainingYear + 1, data.equation);
      const adjusted = applyScenario(base, scenario, factors);
      results[position] = {
        predicted: adjusted,
        rSquared: data.rSquared,
      };
    }
    return Object.entries(results)
      .sort(([, a], [, b]) => b.predicted - a.predicted)
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
  }, [model, scenario, factors, lastTrainingYear]);

  // Experience predictions
  const experiencePredictions = useMemo(() => {
    const results = {};
    for (const [level, data] of Object.entries(model.byExperience)) {
      const base = predictSalary(lastTrainingYear + 1, data.equation);
      const adjusted = applyScenario(base, scenario, factors);
      results[level] = {
        predicted: adjusted,
        rSquared: data.rSquared,
      };
    }
    return results;
  }, [model, scenario, factors, lastTrainingYear]);

  // Available options for profile filters
  const positionOptions = Object.keys(model.byPosition);
  const experienceOptions = Object.keys(model.byExperience);

  return {
    model,
    scenario,
    activePreset,
    updateScenario,
    applyPreset,
    presets: PRESETS,
    profile,
    updateProfile,
    positionOptions,
    experienceOptions,
    overallPredictions,
    chartData,
    positionPredictions,
    experiencePredictions,
    lastTrainingYear,
    activeRSquared: rSquared,
  };
}
