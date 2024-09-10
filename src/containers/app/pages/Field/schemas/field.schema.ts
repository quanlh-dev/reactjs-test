import * as yup from 'yup';

export const fieldValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  offsetFrom: yup.number().required('offsetFrom is required'),
  offsetTo: yup.number().required('offsetTo is required'),
  description: yup.string().optional().nullable(),
});
