import { useMemo, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePrediction } from '../hooks/usePrediction';
import { PageContainer, PageHeaderWithShare } from '../components/layout/PageContainer';
import { ChartWrapper } from '../components/charts/ChartWrapper';
import { Card, ChartIcons } from '../components/ui/Card';
import { PredictionChart } from '../components/prediction/PredictionChart';
import { PredictionSummary } from '../components/prediction/PredictionSummary';
import { ScenarioControls } from '../components/prediction/ScenarioControls';
import { PositionForecast } from '../components/prediction/PositionForecast';
import { BacktestTable } from '../components/prediction/BacktestTable';
import { CustomSelect } from '../components/ui/CustomSelect';

function ProfileFilterPopover({ positionOptions, experienceOptions, profile, updateProfile, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const hasFilter = profile.position !== 'all' || profile.experience !== 'all';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          hasFilter
            ? 'bg-[var(--accent)] text-white'
            : 'bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:text-white'
        }`}
        aria-label="Filter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25a49.069 49.069 0 0 1 8.208.688A1.843 1.843 0 0 1 21.731 4.9v1.149a2.25 2.25 0 0 1-.659 1.59l-5.432 5.433a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21.75v-7.318a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818v-.918c0-.86.596-1.608 1.443-1.792a49.077 49.077 0 0 1 .35-.17Z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl shadow-xl p-3 space-y-3 w-64">
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">{t('prediction.position')}</label>
            <CustomSelect
              options={positionOptions}
              value={profile.position}
              onChange={(value) => updateProfile('position', value)}
              placeholder={t('prediction.allPositions')}
              searchable
            />
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">{t('prediction.experience')}</label>
            <CustomSelect
              options={experienceOptions}
              value={profile.experience}
              onChange={(value) => updateProfile('experience', value)}
              placeholder={t('prediction.allLevels')}
            />
          </div>
          {hasFilter && (
            <button
              onClick={() => { updateProfile('position', 'all'); updateProfile('experience', 'all'); }}
              className="w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer py-1"
            >
              {t('prediction.clearFilters')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

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
    <PageContainer>
        {/* Page Header */}
        <PageHeaderWithShare
          title={t('prediction.title')}
          description={t('prediction.pageDescription')}
          shareTitle={`getSalary - ${t('prediction.title')}`}
          shareDescription={t('prediction.pageDescription')}
          extra={
            <ProfileFilterPopover
              positionOptions={positionSelectOptions}
              experienceOptions={experienceSelectOptions}
              profile={profile}
              updateProfile={updateProfile}
              t={t}
            />
          }
        />

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
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
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
          <Card title={`${t('prediction.byPosition')} (${nextYear})`} icon={ChartIcons.position}>
            <PositionForecast
              predictions={positionPredictions}
              year={nextYear}
              selectedPosition={profile.position !== 'all' ? profile.position : null}
            />
          </Card>

          {/* Right Column: Experience + Backtest */}
          <div className="space-y-6">
            {/* Experience Forecast */}
            <Card title={`${t('prediction.byExperience')} (${nextYear})`} icon={ChartIcons.experience}>
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
    </PageContainer>
  );
}
