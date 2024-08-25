import ListAltIcon from '@mui/icons-material/ListAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import './FieldItem.scss';

export const FieldItem = () => {
  return (
    <div className="field-item">
      <span>
        <span>
          <ListAltIcon />
        </span>
        <span className="field-item-name">
          Field 1 Field 1Field 1Field 1Field 1Field 1Field
        </span>
      </span>
      <span>
        <span className="field-item-offset">0:4 {`(5)`}</span>
        <span className="field-item-delete-btn">
          <CancelPresentationIcon />
        </span>
      </span>
    </div>
  );
};
