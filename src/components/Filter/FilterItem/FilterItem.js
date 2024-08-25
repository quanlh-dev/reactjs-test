import React, { useContext, useState } from 'react';
import { Tooltip } from 'antd';
import './FilterItem.sass';
import {
  FilterResultContext,
  FilterStateContext,
} from '../TabViewFilter/TabViewFilter';
import { FilterSelectContext } from '../FilterPanel/FilterPanel';
import { filterKey } from '../config/filterConfig';
import {
  checkHasFilter,
  checkNeedFilter,
  getFilterResult,
  rmStringInArray,
} from '../helpers/filter';

function FilterItem(props) {
  const { icon, name, number, listTasks, fieldKey, index, phaseId } = props;
  // context for update output
  const { filterResult, setFilterResult } = useContext(FilterResultContext);
  // context for handle UI select / not
  const { filterSelectState, setFilterSelectState } =
    useContext(FilterSelectContext);
  // context for store all tasks select
  const { filterState, setFilterState } = useContext(FilterStateContext);
  function handleSelect() {
    const newSelectState = { ...filterSelectState };
    // update UI
    newSelectState[fieldKey][index] = !(
      newSelectState[fieldKey][index] || false
    );
    setFilterSelectState(newSelectState);
    // coppy trang thai hien tai cua task state
    const filterStateTmp = { ...filterState };

    if (listTasks.length > 0) {
      //  copy output state
      let newResultState = { ...filterResult };
      // If select
      if (fieldKey === filterKey.PHASES) {
        // If select phase
        if (newSelectState[fieldKey][index]) {
          // if add phase
          newResultState.phases.push(phaseId);
        } else {
          // if remove phase
          const indexOfPhase = newResultState.phases.indexOf(phaseId);
          if (indexOfPhase > -1) {
            newResultState.phases.splice(indexOfPhase, 1);
          }
        }
      } else {
        // If select task
        if (newSelectState[fieldKey][index]) {
          // if add task
          // let filterStateTmp = { ...filterState };
          // them task vao tap du lieu
          filterStateTmp[fieldKey] = filterStateTmp[fieldKey].concat(listTasks);
          setFilterState(filterStateTmp);
          // tinh toan tap du lieu de dua ra ket qua cuoi cung
          newResultState.tasks = getFilterResult(filterStateTmp);
        } else {
          // if rm tasks
          listTasks.forEach((task) => {
            filterStateTmp[fieldKey] = filterStateTmp[fieldKey].filter(
              (item) => item._id != task._id,
            );
          });
          setFilterState(filterStateTmp);
          newResultState.tasks = getFilterResult(filterStateTmp);
        }
      }
      // kiem tra nguoi dung co chon filter khong
      const hasFilter = checkHasFilter(filterSelectState);
      newResultState = { ...newResultState, hasFilter };
      setFilterResult(newResultState);
    }
  }
  return (
    <Tooltip title={name} placement="left">
      <div
        className="filter-item"
        style={{
          backgroundColor: `${
            filterSelectState[fieldKey][index] ? 'rgb(204,229,255)' : ''
          }`,
        }}
        onClick={() => handleSelect()}
      >
        {icon && <div className="filter-item__icon">{icon}</div>}
        {name && <div className="filter-item__name">{name}</div>}
        <div className="filter-item__number">{number}</div>
      </div>
    </Tooltip>
  );
}

export default FilterItem;
