import M from 'moment';
import viLocalization from 'moment/locale/vi';
import enLocalization from 'moment/locale/en-au';
import i18 from 'languages/index';

export const getLanguage = () => i18.language ?? window.localStorage.i18nextLng;

export function momentLocale(time) {
  const lang = getLanguage();
  switch (lang) {
    case 'vi':
      return M(time).locale('vi', viLocalization);
    default:
      return M(time);
  }
}

export function calculateTextSize(
  text = 'x',
  style = { fontSize: '14px', fontWeight: 'normal' },
) {
  const container = document.getElementById('calculate-size-text');
  if (container) {
    container.innerText = text;
    for (const key in style) {
      container.style[key] = style[key];
    }
    const height = container.clientHeight + 1;
    const width = container.clientWidth + 1;
    return {
      height,
      width,
    };
  }
  return {
    height: 0,
    width: 0,
  };
}

export function addMonths(date, months) {
  const d = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

export function addWeeks(date, weeks) {
  date.setDate(date.getDate() + 7 * weeks);
  return date;
}

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  console.log(date);
  return date;
}

export function toLowerCaseFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const searchAndfilterProjectDetail = (
  projectDetail,
  filterResult = { hasFilter: false, phases: [], tasks: [] },
  searchResult = { hasSearch: false, task: [] },
) => {
  const initialPhases = projectDetail?.phases ?? [];
  let resultPhases = initialPhases;
  //search
  if (searchResult.hasSearch) {
    if (searchResult?.task?.length != 0) {
      resultPhases = resultPhases.map((phase) => {
        const searchTasks =
          phase.tasks.filter((task) => searchResult.task.includes(task?._id)) ??
          [];
        return {
          ...phase,
          tasks: searchTasks,
        };
      });
    }
  }

  //filter
  if (filterResult.hasFilter) {
    if (filterResult.phases.length != 0) {
      resultPhases = resultPhases.filter((phase) =>
        filterResult.phases.includes(phase?._id),
      );
    }

    if (filterResult.tasks.length != 0) {
      resultPhases = resultPhases.map((phase) => {
        const filterTasks =
          phase.tasks.filter((task) =>
            filterResult.tasks.includes(task?._id),
          ) ?? [];
        return {
          ...phase,
          tasks: filterTasks,
        };
      });
    }
  }

  return resultPhases;
};

export const formatTime = (time) => {
  const distance = new Date() - new Date(time);
  if (distance / 1000 / 60 < 1) return i18.t('fewSecondsAgo');
  if (distance / 1000 / 60 / 60 < 1)
    return Math.floor(distance / 1000 / 60) + ' ' + i18.t('minutesAgo');
  if (distance / 1000 / 60 / 60 / 24 < 1)
    return Math.floor(distance / 1000 / 60 / 60) + ' ' + i18.t('hoursAgo');
  return Math.floor(distance / 1000 / 60 / 60 / 24) + ' ' + i18.t('daysAgo');
};
