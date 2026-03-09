import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePrediction } from '../hooks/usePrediction';
import { ChartWrapper } from '../components/charts/ChartWrapper';
import { Card } from '../components/ui/Card';
import { PredictionChart } from '../components/prediction/PredictionChart';
import { PredictionSummary } from '../components/prediction/PredictionSummary';
import { ScenarioControls } from '../components/prediction/ScenarioControls';
import { PositionForecast } from '../components/prediction/PositionForecast';
import { BacktestTable } from '../components/prediction/BacktestTable';
import { CustomSelect } from '../components/ui/CustomSelect';

export function Prediction() {
  const { t } = useTranslation();
  usePageTitle('prediction');

  const {
    model,
    scenario,
    activePreset,
    updateScenario,
    applyPreset,
    profile,
    updateProfile,
    positionOptions,
    experienceOptions,
    overallPredictions,
    chartData,
    positionPredictions,
    experiencePredictions,
    lastTrainingYear,
  } = usePrediction();

  const nextYear = lastTrainingYear + 1;

  const positionSelectOptions = useMemo(() => [
    { value: 'all', label: t('prediction.allPositions') },
    ...positionOptions.map((p) => ({ value: p, label: p })),
  ], [positionOptions, t]);

  const experienceSelectOptions = useMemo(() => [
    { value: 'all', label: t('prediction.allLevels') },
    ...experienceOptions.map((e) => ({ value: e, label: e })),
  ], [experienceOptions, t]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header + Profile Filters */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {t('prediction.title')}
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              {t('prediction.pageDescription')}
            </p>
          </div>

          {/* Profile selectors — inline with header */}
          <div className="flex gap-2 flex-shrink-0">
            <div className="w-52">
              <CustomSelect
                options={positionSelectOptions}
                value={profile.position}
                onChange={(value) => updateProfile('position', value)}
                placeholder={t('prediction.allPositions')}
                searchable
              />
            </div>
            <div className="w-44">
              <CustomSelect
                options={experienceSelectOptions}
                value={profile.experience}
                onChange={(value) => updateProfile('experience', value)}
                placeholder={t('prediction.allLevels')}
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <PredictionSummary
            predictions={overallPredictions}
            mape={model.overall.backtesting.avgMape}
            lastTrainingYear={lastTrainingYear}
            lastYearMedian={model.historicalMedians.find((m) => m.year === lastTrainingYear)?.median}
          />
        </div>

        {/* Main Grid: Chart + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart - takes 2/3 */}
          <div className="lg:col-span-2">
            <Card title={t('prediction.chartTitle')} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
            }>
              <ChartWrapper height="h-80">
                <PredictionChart data={chartData} lastTrainingYear={lastTrainingYear} />
              </ChartWrapper>
            </Card>
          </div>

          {/* Scenario Controls - takes 1/3 */}
          <Card
            title={t('prediction.scenarioTitle')}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            }
            titleExtra={
              <div className="relative group ml-auto">
                <svg
                  className="w-4 h-4 text-[var(--text-muted)] cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8h.01M12 12v4m0-12a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
                <div className="absolute bottom-full right-0 mb-2 w-64 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border)] shadow-lg text-xs text-[var(--text-secondary)] leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                  {t('prediction.disclaimer')}
                  <div className="absolute top-full right-3 -mt-px border-4 border-transparent border-t-[var(--bg-tertiary)]" />
                </div>
              </div>
            }
          >
            <ScenarioControls
              scenario={scenario}
              activePreset={activePreset}
              onUpdate={updateScenario}
              onPreset={applyPreset}
            />
          </Card>
        </div>

        {/* Bottom Grid: Position Forecast + Backtest + Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Position Forecast */}
          <Card title={`${nextYear} — ${t('prediction.byPosition')}`} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          }>
            <ChartWrapper height="h-96">
              <PositionForecast
                predictions={positionPredictions}
                year={nextYear}
                selectedPosition={profile.position !== 'all' ? profile.position : null}
              />
            </ChartWrapper>
          </Card>

          {/* Right Column: Experience + Backtest */}
          <div className="space-y-6">
            {/* Experience Forecast */}
            <Card title={`${nextYear} — ${t('prediction.byExperience')}`} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            }>
              <div className="space-y-3">
                {Object.entries(experiencePredictions).map(([level, { predicted }]) => {
                  const max = Math.max(...Object.values(experiencePredictions).map((v) => v.predicted));
                  const width = (predicted / max) * 100;
                  const isSelected = profile.experience !== 'all' && profile.experience === level;
                  return (
                    <div key={level}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={isSelected ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>{level}</span>
                        <span className="font-mono font-semibold text-[var(--text-primary)]">
                          {Math.round(predicted / 1000)}K ₺
                        </span>
                      </div>
                      <div className="h-3 bg-[var(--border)]/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Backtest Table */}
            <Card title={t('prediction.backtestTitle')} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            }>
              <BacktestTable backtesting={model.overall.backtesting} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
