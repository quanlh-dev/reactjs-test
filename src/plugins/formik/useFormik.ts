import {
  useFormik as useFormikOrigin,
  FormikValues,
  FormikConfig,
} from 'formik';

export const useFormik = <Values extends FormikValues = FormikValues>(
  opts: FormikConfig<Values>,
) => {
  const formik = useFormikOrigin(opts);
  return formik as any as ReturnType<typeof useFormikOrigin>;
};
