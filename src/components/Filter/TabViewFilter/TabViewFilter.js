import React, { useEffect, useMemo, useState } from 'react';
import { Button, Row, Dropdown, Menu, Tooltip, Input } from 'antd';
import {
  FilterOutlined,
  SearchOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import './TabViewFilter.sass';
import FilterPanel from '../FilterPanel/FilterPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUniqueTask,
  getListStatus,
  getListPersons,
} from 'components/Filter/helpers/filter';
import { get_list_filter_status_success } from 'redux/actions/filter';
import {
  get_list_filter_persons_success,
  get_total_tasks_success,
  get_list_filter_tasks_success,
  get_list_filter_phases_success,
} from 'redux/actions/filter';
import { workspaceModule } from 'containers/app/screens/Workspace/route';
import {
  getListDate,
  getListKanbanDate,
  getListKanbanStatus,
  getUniqueKanbanTask,
} from '../helpers/filter';
import { get_list_filter_date_success } from 'redux/actions/filter';
import {
  defaultFilterResult,
  defaultFilterState,
} from 'components/Filter/config/filterConfig';
import { kanbanModule } from 'containers/app/screens/Kanban/route';
import { defaultSearchState } from '../config/filterConfig';
import { searchString } from 'utils/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// Context for filter

export const FilterResultContext = React.createContext({
  filterResult: {},
  setFilterResult: () => {},
});
export const FilterResultProvider = FilterResultContext.Provider;
export const FilterResultConsumner = FilterResultContext.Consumer;

// store all task select ( no filter unique ).
export const FilterStateContext = React.createContext({
  filterState: {},
  setFilterState: () => {},
});
export const FilterStateProvider = FilterStateContext.Provider;
export const FilterStateConsumner = FilterStateContext.Consumer;

function TabViewFilter(props) {
  const {
    handleAddPhase = () => {},
    // handleSearch = () => { },
    filterResult = defaultFilterResult,
    setFilterResult = () => {},
    searchResult = defaultSearchState,
    setSearchResult = () => {},
    onAddGroupTask = () => {},
    // specific for kanban ( kanban has no phase filter)
    hasPhasesFilter = true,
    currentPhase,
    showAddPhase = true,
  } = props;
  const { t } = useTranslation();
  const filter = useSelector((state) => state.filter);
  const [isShowSearchInput, setIsShowSearchInput] = useState(false);
  const [isShowFilterPanel, setIsShowFilterPanel] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filterContext = { filterResult, setFilterResult };

  const [filterState, setFilterState] = useState({ ...defaultFilterState });
  const filterStateContext = { filterState, setFilterState };
  const dispatch = useDispatch();

  const projectDetail = useSelector(
    (state) => state[workspaceModule.key].currentProject.detail,
  );

  const listPersons = useSelector((state) => state.user.listPersons);
  const listTaskG = useSelector((state) => state.filter.totalTasks);

  const handleSearch = (value) => {
    setSearchText(value);
    let searchResultTmp = { ...searchResult };
    let listTaskResult = [];
    listTaskG.forEach((task) => {
      if (searchString(value, task.name)) {
        listTaskResult.push(task._id);
      }
    });
    searchResultTmp.task = listTaskResult;
    searchResultTmp.hasSearch = listTaskResult.length > 0 || searchText != '';
    setSearchResult(searchResultTmp);
  };

  useEffect(() => {
    if (hasPhasesFilter) {
      if (projectDetail.phases && Object.keys(projectDetail).phases !== 0) {
        dispatch(get_list_filter_phases_success(projectDetail.phases));
        if (projectDetail.phases.length > 0) {
          let listTask = [];
          projectDetail.phases.forEach((phase) => {
            listTask = listTask.concat(phase.tasks);
          });
          dispatch(get_total_tasks_success(listTask));
          let listTaskResult = getUniqueTask(projectDetail, listTask);
          dispatch(get_list_filter_tasks_success(listTaskResult));
          let listStatusResult = getListStatus(projectDetail, listTask);
          dispatch(get_list_filter_status_success(listStatusResult));
          // let listPersonsResult = getListPersons(projectDetail, listTask);
          let listPersonsResult = getListPersons(listPersons, listTask);
          dispatch(get_list_filter_persons_success(listPersonsResult));
          let listDatesResult = getListDate(listTask);
          dispatch(get_list_filter_date_success(listDatesResult));
        }
      }
    } else {
      if (currentPhase?.data && currentPhase?.data?.phaseId) {
        if (
          projectDetail.phases &&
          Object.keys(projectDetail).phases !== 0 &&
          projectDetail.phases.length > 0
        ) {
          // get list task by current phase
          let detailPhase = projectDetail.phases.find(
            (phase) => phase._id === currentPhase.data.phaseId,
          );
          if (detailPhase) {
            let listTask = detailPhase.tasks;
            dispatch(get_total_tasks_success(listTask));
            let listTaskResult = getUniqueKanbanTask(projectDetail, listTask);
            dispatch(get_list_filter_tasks_success(listTaskResult));
            let listStatusResult = getListKanbanStatus(projectDetail, listTask);
            dispatch(get_list_filter_status_success(listStatusResult));
            // let listPersonsResult = getListPersons(projectDetail, listTask);
            let listPersonsResult = getListPersons(listPersons, listTask);
            dispatch(get_list_filter_persons_success(listPersonsResult));
            let listDatesResult = getListKanbanDate(listTask);
            dispatch(get_list_filter_date_success(listDatesResult));
          }
        }
      }
    }
  }, [projectDetail, currentPhase]);

  return (
    <div className="tab-view-filter">
      {hasPhasesFilter && showAddPhase && (
        <Button
          style={{ marginRight: '10px' }}
          type="primary"
          onClick={onAddGroupTask}
        >
          {t('addPhase')}
        </Button>
      )}

      {isShowSearchInput ? (
        <Input
          size="middle"
          autoFocus
          placeholder={t('search')}
          prefix={<SearchOutlined />}
          style={{ fontSize: '16px', borderRadius: '4px' }}
          value={searchText}
          onBlur={() => {
            if (searchText == '') {
              setIsShowSearchInput(false);
            }
          }}
          onChange={(e) => handleSearch(e.target.value)}
          suffix={
            <FontAwesomeIcon
              icon={faTimes}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSearchText('');
                handleSearch('');
              }}
            />
          }
        />
      ) : (
        <Button
          className="btn-hover"
          type="text"
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setIsShowSearchInput(true);
          }}
        >
          <SearchOutlined style={{ lineHeight: '0px' }} />
          {t('search')}
        </Button>
      )}
      <Dropdown
        overlay={
          <FilterResultProvider value={filterContext}>
            <FilterStateProvider value={filterStateContext}>
              <FilterPanel hasPhasesFilter={hasPhasesFilter} />
            </FilterStateProvider>
          </FilterResultProvider>
        }
        placement="bottomLeft"
        trigger={['click']}
        onVisibleChange={(visible) => {
          setIsShowFilterPanel(visible);
        }}
      >
        <Button
          className="btn-hover"
          type="text"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: `${isShowFilterPanel ? 'rgb(204,229,255)' : ''}`,
          }}
        >
          <FilterOutlined style={{ lineHeight: '0px' }} />
          {t('filter.key')}
        </Button>
      </Dropdown>
    </div>
  );
}

export default TabViewFilter;
