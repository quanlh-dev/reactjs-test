import { IFormik } from '@plugins/formik/types';
import './InputTextArea.scss';

type InputTextAreaOptions = {
  formik: IFormik;
  name: string;
  required?: boolean;
  label: string;
};

export const InputTextArea = (opts: InputTextAreaOptions) => {
  const { formik, name, label, required, ...rest } = opts;

  return (
    <div className={`input-text-area-wrapper`}>
      <label
        className={`input-text-area-label ${required ? 'label-required' : ''}`}
      >
        {label}
      </label>
      <textarea
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
  );
};
