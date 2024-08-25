export const dateFilter = {
  TODAY: 'filter.today',
  TOMORROW: 'filter.tomorrow',
  YESTERDAY: 'filter.yesterday',
  THISWEEK: 'filter.thisweek',
  LASTWEEK: 'filter.lastweek',
  NEXTWEEK: 'filter.nextweek',
  THISMONTH: 'filter.thismonth',
};

export const dateFilterList = [
  dateFilter.TODAY,
  dateFilter.TOMORROW,
  dateFilter.YESTERDAY,
  dateFilter.THISWEEK,
  dateFilter.LASTWEEK,
  dateFilter.NEXTWEEK,
];

export const filterKey = {
  PHASES: 'phases',
  NAME: 'name',
  PERSON: 'person',
  STATUS: 'status',
  DATE: 'date',
};

export const defaultFilterResult = {
  hasFilter: false,
  phases: [],
  tasks: [],
};

export const defaultFilterState = {
  [filterKey.NAME]: [],
  [filterKey.PERSON]: [],
  [filterKey.STATUS]: [],
  [filterKey.DATE]: [],
};

export const defaultSearchState = {
  hasSearch: false,
  task: [],
};

// output
const filterStatus = {
  hasFilter: false, // nếu hasFilter = true thì mới lấy các phase và task trong danh sách
  phase: ['phaseid', 'phaseid2'], // danh sách các phase THỎA MÃN điều kiện filter
  task: ['taskid', 'taskid2'], // danh sách các task THỎA MÃN điều kiện filter
};

const searchStatus = {
  // tuong tu nhu tren
  hasSearch: false,
  task: [],
};
