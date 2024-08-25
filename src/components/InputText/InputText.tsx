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
} & {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: TextFieldVariants;
} & Omit<TextFieldProps, 'variant'>;

export const InputText = (opts: InputTextOptions) => {
  const { formik, name, label, ...rest } = opts;
  return (
    <div>
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
