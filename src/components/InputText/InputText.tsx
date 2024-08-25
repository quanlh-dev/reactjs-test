import {
  TextField,
  TextFieldProps,
  TextFieldVariants,
  makeStyles,
} from '@mui/material';
import { IFormik } from '@plugins/formik/types';
import './InputText.scss';

type InputTextOptions = {
  formik: IFormik;
  name: string;
  required?: boolean;
} & {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: TextFieldVariants;
} & Omit<TextFieldProps, 'variant'>;

export const InputText = (opts: InputTextOptions) => {
  const { formik, name, label, required, ...rest } = opts;
  return (
    <div className={`input-text-wrapper`}>
      <label className={`input-text-label ${required ? 'label-required' : ''}`}>
        {label}
      </label>
      <TextField
        fullWidth
        name={name}
        type="text"
        {...rest}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
      />
    </div>
  );
};
