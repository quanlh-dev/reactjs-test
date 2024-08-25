import ListAltIcon from '@mui/icons-material/ListAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import './FieldItem.scss';
import { IField } from '../../field.constants';

type Props = {
  fieldData: IField;
};

export const FieldItem = (props: Props) => {
  const { fieldData } = props;
  return (
    <div className="field-item">
      <span>
        <span>
          <ListAltIcon />
        </span>
        <span className="field-item-name">{fieldData.name}</span>
      </span>
      <span>
        <span className="field-item-offset">
          {fieldData.offsetFrom}:{fieldData.offsetTo}{' '}
          {`(${fieldData.offsetTo - fieldData.offsetFrom + 1})`}
        </span>
        <span className="field-item-delete-btn">
          <CancelPresentationIcon />
        </span>
      </span>
    </div>
  );
};
