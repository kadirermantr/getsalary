/**
 * Build-time script to train salary prediction model.
 * Run with: node scripts/trainModel.js
 *
 * Uses regression-js to fit polynomial models on yearly median salaries,
 * then writes coefficients and backtesting results to predictionModel.json.
 */

import regression from 'regression';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, '..', 'src', 'data');

// Load survey data and compute medians
function loadYearlyMedians() {
  const years = [2021, 2022, 2023, 2024, 2025];
  const results = [];

  for (const year of years) {
    const raw = JSON.parse(readFileSync(join(DATA_DIR, `${year}.json`), 'utf-8'));
    const salaries = raw
      .filter((item) => item.city !== 'Yurtdışı' && item.city !== 'Yurt Dışı')
      .map((item) => item.salary)
      .filter((s) => s > 0)
      .sort((a, b) => a - b);

    const mid = Math.floor(salaries.length / 2);
    const median = salaries.length % 2 ? salaries[mid] : (salaries[mid - 1] + salaries[mid]) / 2;
    results.push({ year, median, count: salaries.length });
  }
  return results;
}

// Group by field and compute medians per group per year
function loadGroupedMedians(field) {
  const years = [2021, 2022, 2023, 2024, 2025];
  const groupData = {};

  for (const year of years) {
    const raw = JSON.parse(readFileSync(join(DATA_DIR, `${year}.json`), 'utf-8'));
    const filtered = raw.filter(
      (item) => item.city !== 'Yurtdışı' && item.city !== 'Yurt Dışı' && item.salary > 0
    );

    const groups = {};
    for (const item of filtered) {
      const key = item[field];
      if (!key) continue;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item.salary);
    }

    for (const [key, salaries] of Object.entries(groups)) {
      if (salaries.length < 10) continue; // skip small groups
      salaries.sort((a, b) => a - b);
      const mid = Math.floor(salaries.length / 2);
      const median = salaries.length % 2 ? salaries[mid] : (salaries[mid - 1] + salaries[mid]) / 2;

      if (!groupData[key]) groupData[key] = [];
      groupData[key].push([year, median]);
    }
  }
  return groupData;
}

// Fit model and return coefficients + metrics
function fitModel(dataPoints, order = 2) {
  if (dataPoints.length < 3) return null;

  const result = regression.polynomial(dataPoints, { order, precision: 6 });

  return {
    equation: result.equation,
    rSquared: Math.round(result.r2 * 10000) / 10000,
    string: result.string,
    predict: (year) => result.predict(year)[1],
  };
}

// Backtesting with expanding window
function backtestModel(dataPoints, order = 2) {
  const results = [];

  // Need at least 3 training points for polynomial-2
  for (let i = 3; i < dataPoints.length; i++) {
    const train = dataPoints.slice(0, i);
    const testYear = dataPoints[i][0];
    const testActual = dataPoints[i][1];

    const model = regression.polynomial(train, { order, precision: 6 });
    const predicted = model.predict(testYear)[1];
    const error = Math.abs(testActual - predicted) / testActual;

    results.push({
      testYear,
      actual: testActual,
      predicted: Math.round(predicted),
      mape: Math.round(error * 10000) / 100,
    });
  }

  const avgMape = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.mape, 0) / results.length * 100) / 100
    : 0;

  return { results, avgMape };
}

// Main
function main() {
  console.log('Loading survey data...');
  const yearlyData = loadYearlyMedians();

  console.log('\nYearly medians:');
  yearlyData.forEach(({ year, median, count }) => {
    console.log(`  ${year}: ${median.toLocaleString('tr-TR')} ₺ (${count} participants)`);
  });

  // Overall model
  const dataPoints = yearlyData.map(({ year, median }) => [year, median]);
  const overallModel = fitModel(dataPoints);
  const backtest = backtestModel(dataPoints);

  console.log(`\nOverall model: ${overallModel.string}`);
  console.log(`R²: ${overallModel.rSquared}`);
  console.log(`\nBacktesting (expanding window):`);
  backtest.results.forEach((r) => {
    console.log(`  ${r.testYear}: actual=${r.actual.toLocaleString('tr-TR')} predicted=${r.predicted.toLocaleString('tr-TR')} MAPE=${r.mape}%`);
  });
  console.log(`  Average MAPE: ${backtest.avgMape}%`);

  // Future predictions
  const predictions = {};
  for (const year of [2026, 2027, 2028]) {
    predictions[year] = Math.round(overallModel.predict(year));
  }
  console.log('\nPredictions:');
  Object.entries(predictions).forEach(([y, p]) => {
    console.log(`  ${y}: ${p.toLocaleString('tr-TR')} ₺`);
  });

  // Position-based models
  console.log('\nTraining position-based models...');
  const positionData = loadGroupedMedians('position');
  const positionModels = {};
  for (const [position, points] of Object.entries(positionData)) {
    if (points.length >= 3) {
      const model = fitModel(points);
      if (model) {
        positionModels[position] = {
          equation: model.equation,
          rSquared: model.rSquared,
          prediction2026: Math.round(model.predict(2026)),
        };
        console.log(`  ${position}: R²=${model.rSquared}, 2026=${positionModels[position].prediction2026.toLocaleString('tr-TR')} ₺`);
      }
    }
  }

  // Experience-based models
  console.log('\nTraining experience-based models...');
  const experienceData = loadGroupedMedians('experienceLevel');
  const experienceModels = {};
  for (const [level, points] of Object.entries(experienceData)) {
    if (points.length >= 3) {
      const model = fitModel(points);
      if (model) {
        experienceModels[level] = {
          equation: model.equation,
          rSquared: model.rSquared,
          prediction2026: Math.round(model.predict(2026)),
        };
        console.log(`  ${level}: R²=${model.rSquared}, 2026=${experienceModels[level].prediction2026.toLocaleString('tr-TR')} ₺`);
      }
    }
  }

  // Build output JSON
  const output = {
    metadata: {
      trainedAt: new Date().toISOString(),
      dataYears: yearlyData.map((d) => d.year),
      participants: yearlyData.map((d) => d.count),
      modelType: 'polynomial-2',
    },
    overall: {
      equation: overallModel.equation,
      rSquared: overallModel.rSquared,
      predictions,
      backtesting: backtest,
    },
    byPosition: positionModels,
    byExperience: experienceModels,
    adjustmentFactors: {
      inflationSensitivity: 0.65,
      exchangeRateSensitivity: 0.25,
      sectorGrowthSensitivity: 0.10,
    },
    historicalMedians: yearlyData.map(({ year, median }) => ({ year, median })),
  };

  const outputPath = join(DATA_DIR, 'predictionModel.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n✓ Model saved to ${outputPath}`);
}

main();
