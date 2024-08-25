import React from 'react';
import { FIELD_KEY } from 'containers/app/screens/Kanban/configs/configs';
import userIconDefault from 'assets/images/dapulse_default_photo.png';
import { dateFilter, dateFilterList, filterKey } from '../config/filterConfig';

export function getUniqueTask(projectDetail, listTask) {
  const listTaskName = [];
  let listResult = [];
  listTask.forEach((task) => {
    listTaskName.push(task.name);
  });
  const uniqueListName = new Set(listTaskName);
  listResult = Array.from(uniqueListName).map((taskName) => ({
    name: taskName,
    tasks: listTask.filter((task) => task.name === taskName),
  }));
  return listResult;
}

export function getListStatus(projectDetail, listTask) {
  let listResult = [];
  const status = projectDetail.fields.find(
    (field) => field.fieldKey === FIELD_KEY.STATUS,
  );
  if (status) {
    const configStatus = status.fieldConfigs.options;
    listResult = configStatus.map((option) => ({
      name: option.value,
      tasks: listTask.filter((task) => task.value.status === option.value),
      icon: (
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: option.color,
            borderRadius: '50%',
          }}
        />
      ),
    }));
    return listResult;
  }
  return [];
}

export function getListPersons(listPerson, listTask) {
  try {
    const listResult = listPerson.map((person) => ({
      name: `${person.name} ${person.surname}`,
      tasks: listTask.filter((task) =>
        task.value[FIELD_KEY.ASSIGNEE].includes(person._id),
      ),
      icon: (
        <img
          src={userIconDefault || person.profilePictureId}
          style={{ width: '24px', height: '24px', objectFit: 'cover' }}
          alt={person.name + person.surname}
        />
      ),
    }));
    return listResult;
  } catch (e) {
    return [];
  }
}

export function getListDate(listTask) {
  const listResult = [];
  dateFilterList.forEach((date) => {
    const listResultTmp = {
      name: date,
      tasks: [],
    };
    switch (date) {
      case dateFilter.TODAY:
        listTask.forEach((task) => {
          const isAdd = checkIsToday(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.TOMORROW:
        listTask.forEach((task) => {
          const isAdd = checkIsTomorrow(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });

        break;
      case dateFilter.YESTERDAY:
        listTask.forEach((task) => {
          const isAdd = checkIsYesterday(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.THISWEEK:
        listTask.forEach((task) => {
          const isAdd = checkIsSameWeek(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.LASTWEEK:
        listTask.forEach((task) => {
          const isAdd = checkIsLastWeek(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.NEXTWEEK:
        listTask.forEach((task) => {
          const isAdd = checkIsNextWeek(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
    }
    listResult.push(listResultTmp);
  });
  return listResult;
}

function checkIsToday(date) {
  const today = new Date();
  if (
    today.getFullYear() == date.getFullYear() &&
    today.getMonth() == date.getMonth() &&
    today.getDate() == date.getDate()
  ) {
    return true;
  }
  return false;
}
function checkIsTomorrow(date) {
  // const today = new Date(date.getDate() + 1);
  date.setDate(date.getDate() - 1);
  return checkIsToday(date);
}
function checkIsYesterday(date) {
  date.setDate(date.getDate() + 1);
  return checkIsToday(date);
}

function getMondayOfWeek() {
  const date = new Date();
  const day = date.getDay();
  const dateDiff = date.getDate() - day + (day == 0 ? -6 : 1);
  date.setHours(0, 0, 0);
  date.setDate(dateDiff);
  return date;
}

function getSundayOfWeek() {
  const date = new Date();
  const day = date.getDay();
  const dateDiff = date.getDate(2021, 9, 3) - day + (day == 0 ? 0 : 7);
  date.setDate(dateDiff);
  date.setHours(23, 59, 59);
  return date;
}

function checkIsSameWeek(date) {
  const monday = getMondayOfWeek();
  const sunday = getSundayOfWeek();
  if (
    date.getTime() >= monday.getTime() &&
    date.getTime() <= sunday.getTime()
  ) {
    return true;
  }
  return false;
}

function checkIsNextWeek(date) {
  const dateDiff = date.getDate() - 7;
  date.setDate(dateDiff);
  return checkIsSameWeek(date);
}
function checkIsLastWeek(date) {
  const dateDiff = date.getDate() + 7;
  date.setDate(dateDiff);
  return checkIsSameWeek(date);
}

export function rmStringInArray(arr, string) {
  const indexOfPhase = arr.indexOf(string);
  if (indexOfPhase > -1) {
    arr.splice(indexOfPhase, 1);
  }
  return arr;
}

export function getFilterResult(input) {
  const needCheck = checkNeedFilter(input);
  const listResult = [];
  if (needCheck.status) {
    for (let i = 0; i < input[needCheck.field].length; i++) {
      const task = input[needCheck.field][i];
      let isSatify = true;
      // lap tung vong trong columns dau xem cac column khac co task khong. neu co them vao ket qua
      for (const property in input) {
        if (property !== needCheck.field && input[property].length > 0) {
          if (!input[property].includes(task)) {
            isSatify = false;
          }
        }
      }
      if (isSatify) {
        listResult.push(task._id);
      }
    }
  } else if (needCheck.field !== '') {
    input[needCheck.field].forEach((item) => listResult.push(item._id));
  }
  return listResult;
}

export function checkNeedFilter(input) {
  // kiemtra xem cac task co cung mot truong hay khong
  let count = 0;
  let fieldFilter = {
    status: false,
    field: '',
  };
  for (const property in input) {
    if (input[property].length > 0) {
      count++;
      if (count > 1) {
        fieldFilter = {
          ...fieldFilter,
          status: true,
        };
        return fieldFilter;
      }
      fieldFilter.field = property;
    }
  }
  return fieldFilter;
}

export function checkHasFilter(input) {
  // kiem tra xem cac truong filter co gia tri hay khong ( tra ra ket qua qua hasFilter)
  const fieldFilter = false;
  for (const property in input) {
    const checkField = input[property].some((item) => item === true);
    if (checkField) {
      return true;
    }
  }
  return fieldFilter;
}

// FOR KANBAN
export function getUniqueKanbanTask(projectDetail, listTask) {
  const listTaskName = [];
  let listResult = [];
  listTask.forEach((task) => {
    listTaskName.push(task.name);
  });
  const uniqueListName = new Set(listTaskName);
  listResult = Array.from(uniqueListName).map((taskName) => ({
    name: taskName,
    tasks: listTask.filter((task) => task.name === taskName),
  }));
  return listResult;
}

export function getListKanbanStatus(projectDetail, listTask) {
  let listResult = [];
  const status = projectDetail.fields.find(
    (field) => field.fieldKey === FIELD_KEY.STATUS,
  );
  if (status) {
    const configStatus = status.fieldConfigs.options;
    listResult = configStatus.map((option) => ({
      name: option.value,
      tasks: listTask.filter((task) => task.value.status === option.value),
      icon: (
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: option.color,
            borderRadius: '50%',
          }}
        />
      ),
    }));
    return listResult;
  }
  return [];
}

export function getListKanbanPersons(listPerson, listTask) {
  try {
    const listResult = listPerson.map((person) => ({
      name: `${person.name} ${person.surname}`,
      tasks: listTask.filter((task) =>
        task.value[FIELD_KEY.ASSIGNEE].includes(person._id),
      ),
      icon: (
        <img
          src={userIconDefault || person.profilePictureId}
          style={{ width: '24px', height: '24px', objectFit: 'cover' }}
          alt={person.name + person.surname}
        />
      ),
    }));
    return listResult;
  } catch (e) {
    return [];
  }
}

export function getListKanbanDate(listTask) {
  const listResult = [];
  dateFilterList.forEach((date) => {
    const listResultTmp = {
      name: date,
      tasks: [],
    };
    switch (date) {
      case dateFilter.TODAY:
        listTask.forEach((task) => {
          const isAdd = checkIsToday(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.TOMORROW:
        listTask.forEach((task) => {
          const isAdd = checkIsTomorrow(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });

        break;
      case dateFilter.YESTERDAY:
        listTask.forEach((task) => {
          const isAdd = checkIsYesterday(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.THISWEEK:
        listTask.forEach((task) => {
          const isAdd = checkIsSameWeek(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.LASTWEEK:
        listTask.forEach((task) => {
          const isAdd = checkIsLastWeek(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
      case dateFilter.NEXTWEEK:
        listTask.forEach((task) => {
          const isAdd = checkIsNextWeek(new Date(task.value[FIELD_KEY.DATE]));
          if (isAdd) {
            listResultTmp.tasks.push(task);
          }
        });
        break;
    }
    listResult.push(listResultTmp);
  });
  return listResult;
}
