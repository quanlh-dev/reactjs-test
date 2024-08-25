import { IFormik } from '@plugins/formik/types';
import './InputOffset.scss';
import { InputNumber } from '@components/InputNumber/InputNumber';

type Props = {
  formik: IFormik;
};

export const InputOffset = (props: Props) => {
  const { formik } = props;
  return (
    <div className={`input-offset-wrapper`}>
      <label className={`input-offset-label label-required`}>Offset</label>
      <div className="input-offset-content">
        <div className="input-offset-content-item">
          <span>From</span>
          <InputNumber name="offsetFrom" formik={formik} />
        </div>
        <div className="input-offset-content-item">
          <span>To</span>
          <InputNumber name="offsetTo" formik={formik} />
        </div>
      </div>
    </div>
  );
};
