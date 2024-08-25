import { MenuItem, Select, SelectProps } from '@mui/material';
import { IFormik } from '@plugins/formik/types';
import './SingleSelect.scss';

type ISelectOption = {
  label: React.ReactNode;
  value?: string | number | null;
};

type SingleSelectOptions = {
  formik: IFormik;
  name: string;
  required?: boolean;
  options: ISelectOption[];
} & SelectProps<any>;

export const SingleSelect = (opts: SingleSelectOptions) => {
  const { formik, name, label, required, options, ...rest } = opts;
  return (
    <div className={`single-select-wrapper`}>
      <label
        className={`single-select-label ${required ? 'label-required' : ''}`}
      >
        {label}
      </label>
      <Select
        {...rest}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        displayEmpty
        error={formik.touched[name] && Boolean(formik.errors[name])}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value?.toString()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};