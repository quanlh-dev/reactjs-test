import * as yup from 'yup';

export const fieldValidationSchema = yup.object({
  name: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
