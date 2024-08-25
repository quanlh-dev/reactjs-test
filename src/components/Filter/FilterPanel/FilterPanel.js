import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterPanelItem from '../FilterPanelItem/FilterPanelItem.js';
import './FilterPanel.sass';
import { defaultFilterState, filterKey } from '../config/filterConfig';
import { useSelector } from 'react-redux';
import {
  defaultFilterResult,
  FilterResultContext,
  FilterStateContext,
} from '../TabViewFilter/TabViewFilter.js';

export const FilterSelectContext = React.createContext({
  filterSelectState: {},
  setFilterSelectState: () => {},
});
export const FilterStatusProvider = FilterSelectContext.Provider;
export const FilterStatusConsumner = FilterSelectContext.Consumer;

function FilterPanel({ hasPhasesFilter }) {
  const { t } = useTranslation();
  const filter = useSelector((state) => state.filter);
  const { filterResult, setFilterResult } = useContext(FilterResultContext);
  const { filterState, setFilterState } = useContext(FilterStateContext);
  const [filterSelectState, setFilterSelectState] = useState({
    [filterKey.PHASES]: [],
    [filterKey.NAME]: [],
    [filterKey.PERSON]: [],
    [filterKey.STATUS]: [],
    [filterKey.DATE]: [],
  });
  const filterSelectContext = { filterSelectState, setFilterSelectState };

  function handleClearFilter() {
    const newState = { ...filterSelectState };
    for (const property in newState) {
      if (newState[property].length > 0) {
        for (let i = 0; i < newState[property].length; i++) {
          newState[property][i] = false;
        }
      }
    }
    // unselect on UI
    setFilterSelectState(newState);
    // set Result to default
    setFilterResult({
      hasFilter: false,
      phases: [],
      tasks: [],
    });

    setFilterState({
      ...defaultFilterState,
    });
    // setFilterSelectState({
    //   [filterKey.PHASES]: [],
    //   [filterKey.NAME]: [],
    //   [filterKey.PERSON]: [],
    //   [filterKey.STATUS]: [],
    //   [filterKey.DATE]: [],
    // });
  }

  return (
    <div
      className="filter-panel"
      style={hasPhasesFilter ? { width: '800px' } : { width: '640px' }}
    >
      <div className="filter-panel__header">
        <div className="filter-panel__header-text">
          <span className="key">{t('filter.keys')}</span>
          {/* <div className="filter-panel__header-status">
            <span>
              {t('filter.showing')}{' '}
              {filterResult.hasFilter
                ? filterResult.tasks.length
                : t('filter.all')}{' '}
              {t('filter.of')} {filter.listTasks.length} {t('filter.items')}
            </span>
          </div> */}
        </div>
        <div onClick={handleClearFilter} className="filter-panel__clear-all">
          {t('filter.clearall')}
        </div>
      </div>
      <FilterStatusProvider value={filterSelectContext}>
        <div className="filter-panel__content">
          {hasPhasesFilter && (
            <div className="filter-panel__content-item">
              <FilterPanelItem
                fieldKey={filterKey.PHASES}
                name={t('filter.phases')}
                itemList={filter.listPhases}
              />
            </div>
          )}

          <div className="filter-panel__content-item">
            <FilterPanelItem
              fieldKey={filterKey.NAME}
              name={t('filter.name')}
              itemList={filter.listTasks}
            />
          </div>
          <div className="filter-panel__content-item">
            <FilterPanelItem
              fieldKey={filterKey.PERSON}
              name={t('filter.person')}
              itemList={filter.listPersons}
            />
          </div>
          <div className="filter-panel__content-item">
            <FilterPanelItem
              fieldKey={filterKey.STATUS}
              name={t('filter.status')}
              itemList={filter.listStatus}
            />
          </div>
          <div className="filter-panel__content-item">
            <FilterPanelItem
              fieldKey={filterKey.DATE}
              name={t('filter.date')}
              itemList={filter.listDates}
            />
          </div>
        </div>
      </FilterStatusProvider>
    </div>
  );
}

export default FilterPanel;
