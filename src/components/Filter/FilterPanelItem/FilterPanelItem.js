import React, { useContext } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { filterKey } from '../config/filterConfig';
import FilterItem from '../FilterItem/FilterItem';
import { FilterSelectContext } from '../FilterPanel/FilterPanel';
import './FilterPanelItem.sass';

function FilterPanelItem(props) {
  const { fieldKey, name, itemList } = props;
  const { filterSelectState, setFilterSelectState } =
    useContext(FilterSelectContext);
  const { t } = useTranslation();

  return (
    <div className="filter-panel-item">
      <div className="filter-panel-item__name">{name}</div>
      <Scrollbars autoHeight autoHeightMax={220}>
        {itemList.map((item, index) => {
          return (
            <div key={index} className="filter-panel-item__item">
              <FilterItem
                phaseId={fieldKey === filterKey.PHASES ? item._id : null}
                index={index}
                fieldKey={fieldKey}
                name={fieldKey === filterKey.DATE ? t(item?.name) : item?.name}
                icon={item?.icon ? item?.icon : null}
                number={item.tasks.length}
                listTasks={item.tasks}
              />
              <div style={{ width: '10px' }}></div>
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
}

export default FilterPanelItem;
