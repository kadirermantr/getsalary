/**
 * Salary prediction utilities — zero runtime dependencies.
 * Uses pre-computed polynomial coefficients from predictionModel.json.
 */

/**
 * Predict salary for a given year using polynomial coefficients.
 * Polynomial: y = a*x^2 + b*x + c (for order 2)
 * @param {number} year - Target year
 * @param {number[]} equation - Polynomial coefficients [a, b, c]
 * @returns {number} Predicted salary
 */
export function predictSalary(year, equation) {
  return equation.reduce(
    (sum, coeff, i) => sum + coeff * Math.pow(year, equation.length - 1 - i),
    0
  );
}

/**
 * Apply scenario adjustment factors to a base prediction.
 * @param {number} basePrediction - Base predicted salary
 * @param {Object} params - Scenario parameters (0-1 scale, e.g., 0.30 = %30)
 * @param {number} params.inflation - Expected inflation rate
 * @param {number} params.exchangeRate - Expected USD/TRY change rate
 * @param {number} params.sectorGrowth - Expected sector growth rate
 * @param {Object} factors - Sensitivity factors from model
 * @returns {number} Adjusted prediction
 */
export function applyScenario(basePrediction, params, factors) {
  // Normalize: model was trained on historical data where ~%40 average inflation
  // existed. Deviation from baseline affects prediction.
  const baselineInflation = 0.40;
  const inflationDelta = (params.inflation - baselineInflation) * factors.inflationSensitivity;
  const fxEffect = params.exchangeRate * factors.exchangeRateSensitivity;
  const growthEffect = params.sectorGrowth * factors.sectorGrowthSensitivity;

  return Math.round(basePrediction * (1 + inflationDelta + fxEffect + growthEffect));
}

/**
 * Calculate confidence interval that widens with distance from training data.
 * @param {number} prediction - Predicted value
 * @param {number} rSquared - Model R² value
 * @param {number} yearsAhead - Number of years beyond training data
 * @returns {{ lower: number, upper: number }} Confidence bounds
 */
export function calculateConfidenceInterval(prediction, rSquared, yearsAhead) {
  // Base uncertainty from model fit + growing uncertainty with distance
  const baseUncertainty = 1 - rSquared;
  const distanceUncertainty = yearsAhead * 0.08;
  const totalUncertainty = Math.min(baseUncertainty + distanceUncertainty, 0.50);

  return {
    lower: Math.round(prediction * (1 - totalUncertainty)),
    upper: Math.round(prediction * (1 + totalUncertainty)),
  };
}

/**
 * Build chart data combining historical actuals and predictions.
 * @param {Array} historicalMedians - [{ year, median }]
 * @param {number[]} equation - Model equation
 * @param {number} rSquared - Model R²
 * @param {number} forecastYears - Number of years to forecast
 * @returns {Array} Chart-ready data
 */
export function buildChartData(historicalMedians, equation, rSquared, forecastYears = 3) {
  const lastYear = Math.max(...historicalMedians.map((d) => d.year));
  const data = [];

  // Historical data with fitted values
  for (const { year, median } of historicalMedians) {
    data.push({
      year,
      actual: median,
      predicted: Math.round(predictSalary(year, equation)),
    });
  }

  // Future predictions
  for (let i = 1; i <= forecastYears; i++) {
    const year = lastYear + i;
    const predicted = Math.round(predictSalary(year, equation));
    const ci = calculateConfidenceInterval(predicted, rSquared, i);
    data.push({
      year,
      actual: null,
      predicted,
      ciLower: ci.lower,
      ciUpper: ci.upper,
    });
  }

  return data;
}
